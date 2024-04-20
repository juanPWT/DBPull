export namespace main {
	
	export class DatabaseConfig {
	    id: number;
	    name: string;
	    url: string;
	    db: string;
	
	    static createFrom(source: any = {}) {
	        return new DatabaseConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.url = source["url"];
	        this.db = source["db"];
	    }
	}
	export class TableType {
	    column: string;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new TableType(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.column = source["column"];
	        this.type = source["type"];
	    }
	}

}

