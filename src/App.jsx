import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Components/Home";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";





function App() {
  

  return (
   <div>
    <Router>
      <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/reset-password/:token" element={<ResetPassword/>}></Route>
       <Route path="/dashboard" element={<Dashboard/>}></Route>
       


      </Routes>
    </Router>
   </div>
  )
}

export default App
