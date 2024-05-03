package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// test connect to database
type DatabaseType string

const (
	MySQL    DatabaseType = "mysql"
	Postgres DatabaseType = "postgres"
)

func (a *App) TestConnectDB(url string, db DatabaseType) bool {
	if db == MySQL {
		_, err := gorm.Open(mysql.Open(url), &gorm.Config{})
		if err == nil {
			return true
		}

		return false
	} else if db == Postgres {
		_, err := gorm.Open(postgres.Open(url), &gorm.Config{})
		if err == nil {
			return true
		}
		return false
	} else {
		return false
	}
}

// save template to file
type DatabaseConfig struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Url  string `json:"url"`
	Db   string `json:"db"`
}

func (a *App) SaveTemplateToFile(url string, db string, name string) string {
	var arrayDBConfig []DatabaseConfig

	// load existing data from file
	if _, err := os.Stat("configDB.json"); err == nil {
		existingData, err := ioutil.ReadFile("configDB.json")
		if err != nil {
			return fmt.Sprintf("Error: cannot read file: %s", err.Error())
		}

		// unmarshal eisting data into slice
		if err := json.Unmarshal(existingData, &arrayDBConfig); err != nil {
			return fmt.Sprintf("Error: cannot unmarshal json: %s", err.Error())
		}

	}

	// save to json
	dbConfig := DatabaseConfig{
		Id:   int(rand.Int31()),
		Name: name,
		Url:  url,
		Db:   db,
	}

	arrayDBConfig = append(arrayDBConfig, dbConfig)

	jsonData, err := json.MarshalIndent(arrayDBConfig, "", "    ")
	if err != nil {
		return fmt.Sprint("Error:", err.Error())
	}

	// save ke file json
	err = ioutil.WriteFile("configDB.json", jsonData, 0644)
	if err != nil {
		errSave := []byte("Error: cannot save to file")
		return string(errSave)
	}

	successMsg := []byte("Success save to config")
	return string(successMsg)
}

// read data from configDB.json
func (a *App) AllConfigDB() []DatabaseConfig {
	file, err := ioutil.ReadFile("configDB.json")
	if err != nil {
		fmt.Println("error cannot read json")
		return nil
	}

	var data []DatabaseConfig

	errJsonUn := json.Unmarshal([]byte(file), &data)
	if errJsonUn != nil {
		fmt.Println("error cannot unmarshal json")
		return nil
	}

	return data
}

// delete data from configDB.json
func (a *App) DeleteConfigDB(id int) bool {
	dataConf := a.AllConfigDB()
	var newData []DatabaseConfig

	for _, v := range dataConf {
		if v.Id != id {
			newData = append(newData, v)
		}
	}

	newJsonData, err := json.MarshalIndent(newData, "", "  ")
	if err != nil {
		return false
	}

	// chack if file exist, if yes, remove it
	if _, err := os.Stat("configDB.json"); err != nil {
		err := os.Remove("configDB.json")
		if err != nil {
			return false
		}
	}

	errSaveFile := ioutil.WriteFile("configDB.json", newJsonData, 0644)
	if errSaveFile != nil {
		return false
	}

	return true
}

func (a *App) DeleteAllConfig() bool {
	// chack if file exist, if yes, remove it
	if _, err := os.Stat("configDB.json"); err == nil {
		err := os.Remove("configDB.json")
		if err != nil {
			return false
		}
		return true
	}

	return false
}

// get tables
var DB *gorm.DB

func (a *App) GetAllTable(id int) []string {
	// get data by id
	dataConf := a.AllConfigDB()
	var url string
	var database string

	for _, v := range dataConf {
		if v.Id == id {
			url = v.Url
			database = v.Db
		}
	}

	var tables []string

	if database == "mysql" {
		db, err := gorm.Open(mysql.Open(url), &gorm.Config{})
		if err != nil {
			fmt.Println("Error: cannot connect to database")
			return nil
		}

		db.Raw("SHOW TABLES").Scan(&tables)

		DB = db

	} else if database == "postgres" {
		db, err := gorm.Open(postgres.Open(url), &gorm.Config{})
		if err != nil {
			fmt.Println("Error: cannot connect to database")
			return nil
		}

		db.Raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'").Scan(&tables)

		DB = db

	} else {
		fmt.Println("Error: database not supported")
		return nil
	}

	return tables
}

// get table column

func (a *App) GetColumnTable(table string, id int) []string {
	dataConf := a.AllConfigDB()
	var db string
	var query string

	for _, v := range dataConf {
		if v.Id == id {
			db = v.Db
		}
	}

	if db == "mysql" {
		query = "SELECT * FROM " + table
	} else if db == "postgres" {
		query = "SELECT * FROM \"" + table + "\""
	}

	rows, err := DB.Raw(query).Rows()
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	defer rows.Close()

	column, err := rows.Columns()
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	return column
}

// get values table
func (a *App) GetValuesTable(table string, id int) []map[string]interface{} {
	columns := a.GetColumnTable(table, id)

	dataConf := a.AllConfigDB()
	var db string
	var query string

	for _, v := range dataConf {
		if v.Id == id {
			db = v.Db
		}
	}

	if db == "mysql" {
		query = "SELECT " + strings.Join(columns, ", ") + " FROM " + table
	} else if db == "postgres" {
		// tranfroms string to string with doubel quote "id", "name"
		var columnList []string
		for _, v := range columns {
			columnList = append(columnList, fmt.Sprintf("\"%s\"", v))
		}
		query = "SELECT " + strings.Join(columnList, ", ") + " FROM \"" + table + "\""
	}

	rows, err := DB.Raw(query).Rows()
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	defer rows.Close()

	// mapping for value
	var results []map[string]interface{}

	for rows.Next() {
		rowData := make(map[string]interface{})

		values := make([]interface{}, len(columns))
		valuesPtrs := make([]interface{}, len(columns))

		for i := range valuesPtrs {
			valuesPtrs[i] = &values[i]
		}

		if err := rows.Scan(valuesPtrs...); err != nil {
			fmt.Println("Error:", err)
			return nil
		}

		for i, col := range columns {
			val := values[i]
			if val != nil {
				// conversion value byte to string if type data is []uint8 (byte)
				if dataBytes, ok := val.([]uint8); ok {
					rowData[col] = string(dataBytes)
				} else {
					rowData[col] = val
				}
			} else {
				rowData[col] = nil
			}
		}

		results = append(results, rowData)
	}

	return results
}

type TableType struct {
	Column string `json:"column"`
	Type   string `json:"type"`
}

// get sructure column
func (a *App) GetTypeColumn(table string, id int) []TableType {
	columns := a.GetColumnTable(table, id)
	dataConf := a.AllConfigDB()
	var query string
	var db string

	for _, v := range dataConf {
		if v.Id == id {
			db = v.Db
		}
	}

	if db == "mysql" {
		query = "SELECT " + strings.Join(columns, ", ") + " FROM " + table
	} else if db == "postgres" {
		// tranfroms string to string with doubel quote "id", "name"
		var columnList []string
		for _, v := range columns {
			columnList = append(columnList, fmt.Sprintf("\"%s\"", v))
		}
		query = "SELECT " + strings.Join(columnList, ", ") + " FROM \"" + table + "\""
	}

	rows, err := DB.Raw(query).Rows()
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	defer rows.Close()

	// get column type
	var types []TableType

	columnTypes, err := rows.ColumnTypes()
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	for _, v := range columnTypes {
		types = append(types, TableType{
			Column: v.Name(),
			Type:   v.DatabaseTypeName(),
		})
	}

	return types
}

func (a *App) InsertRow(data map[string]interface{}, id int, table string) string {
	// get all data
	var db string
	var query string

	columns := a.GetColumnTable(table, id)
	dataConf := a.AllConfigDB()

	for _, v := range dataConf {
		if v.Id == id {
			db = v.Db
		}
	}

	// shorten data to columns
	var shortenData []interface{}
	for _, v := range columns {
		shortenData = append(shortenData, data[v])
	}

	if db == "mysql" {
		query = "INSERT INTO " + table + " (" + strings.Join(columns, ", ") + ") VALUES (" + strings.Repeat("?, ", len(columns)-1) + "?)"
	} else if db == "postgres" {
		// tranfroms string to string with doubel quote "id", "name"
		var columnList []string
		for _, v := range columns {
			columnList = append(columnList, fmt.Sprintf("\"%s\"", v))
		}
		query = "INSERT INTO \"" + table + "\" (" + strings.Join(columnList, ", ") + ") VALUES (" + strings.Repeat("?, ", len(columns)-1) + "?)"
	}

	err := DB.Exec(query, shortenData...)
	if err.Error != nil {
		return fmt.Sprintf("Error: %s", err.Error)
	}

	msg := []byte("Success: success insert row to table")
	return string(msg)
}

type RawRes struct {
	Status       string                   `json:"status"`
	IsDirectData bool                     `json:"isDirectData"`
	Columns      []string                 `json:"columns"`
	Data         []map[string]interface{} `json:"data"`
}

func (a *App) RawQuery(query string) RawRes {
	if query == "" {
		return RawRes{
			Status:       "Error: query not null string",
			IsDirectData: false,
			Columns:      nil,
			Data:         nil,
		}
	}

	// execute query
	var result []map[string]interface{}
	err := DB.Raw(query).Scan(&result)

	if err.Error != nil {
		return RawRes{
			Status:       "Error: " + err.Error.Error(),
			IsDirectData: false,
			Columns:      nil,
			Data:         nil,
		}
	}

	if strings.Contains(query, "select") {
		// get columns from query
		rows, errRows := DB.Raw(query).Rows()
		if errRows != nil {
			return RawRes{
				Status:       "Error: failed get rows",
				IsDirectData: false,
				Columns:      nil,
				Data:         nil,
			}
		}

		columns, errCol := rows.Columns()
		if errCol != nil {
			return RawRes{
				Status:       "Error: cannot get columns",
				IsDirectData: false,
				Columns:      nil,
				Data:         nil,
			}
		}

		fmt.Println("columns: ", columns)

		// check
		fmt.Println("sorted result")
		for _, v := range result {
			fmt.Println(v)
		}

		return RawRes{
			Status:       "Success: query sql ok 200",
			IsDirectData: true,
			Columns:      columns,
			Data:         result,
		}

	}

	return RawRes{
		Status:       "Success: query sql ok 200",
		IsDirectData: false,
		Columns:      nil,
		Data:         nil,
	}
}
