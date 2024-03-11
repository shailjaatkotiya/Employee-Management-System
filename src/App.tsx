import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AddEmployee from "./components/EmployeeForm";
import EmployeeList  from "./components/ListEmployee";
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/list'} replace />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:Id" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
