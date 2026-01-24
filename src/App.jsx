import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Components/Home";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import NetflixPage from "./Components/NetflixPage";



function App() {
  

  return (
   <div>
    <Router>
      <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/reset-password/:token" element={<ResetPassword/>}></Route>
       <Route path="/netflix-page" element={<NetflixPage/>}></Route>


      </Routes>
    </Router>
   </div>
  )
}

export default App
