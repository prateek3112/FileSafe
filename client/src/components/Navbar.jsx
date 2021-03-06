import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, Router } from "react-router-dom";

const logOut = ()=>{
  localStorage.removeItem("isLoggedIn");
  
  sessionStorage.clear();
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
  window.location.href = '/login';
}

const Navbar = () => {

  
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/home"><i className="bi bi-file-earmark-post"></i> FileSafe</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          {!window.localStorage.getItem("isLoggedIn") && <NavLink className="nav-link pull-right" to="/login">Login</NavLink>}
        </li>
        <li className="nav-item">
          {window.localStorage.getItem("isLoggedIn") && <NavLink className="nav-link pull-right" onClick={logOut} to="/login">Logout</NavLink>}
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Register</NavLink>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar
