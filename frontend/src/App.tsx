import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import NewConnection from "./new-connection/NewConnection";
import Dashboard from "./dashboard/Dashboard";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-connection" element={<NewConnection />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
