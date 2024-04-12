import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import NewConnection from "./new-connection/NewConnection";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-connection" element={<NewConnection />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;