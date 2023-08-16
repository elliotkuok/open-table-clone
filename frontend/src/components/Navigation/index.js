import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import LoginFormModal from "../LoginFormModal";
import "./NavigationBar.css"; // Import your CSS file for styling

function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <div className="logo-button">
        <Link to="/">
          {/* Your logo here */}
          <img src="/path/to/your/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="right-side">
        <LoginFormModal />
        {/* Add your search button here */}
        {/* <button className="search-button">Search</button> */}
      </div>
    </nav>
  );
}

export default NavigationBar;
