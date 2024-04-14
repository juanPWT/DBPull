import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import NewConnection from "./new-connection/NewConnection";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-connection" element={<NewConnection />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
