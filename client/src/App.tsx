import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Signup from "./components/Pages/Signup/Signup";
import Login from "./components/Pages/Login/Login";
import Users from "./components/Pages/Users/Users";
import Navigation from "./components/Elements/Navbar/Navbar";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Routes>
                <Route path="signup" element={<Signup/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="users" element={<Users/>}/>
            </Routes>
        </div>
    )
}

export default App;
