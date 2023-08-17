import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import LoginFormModal from "../LoginFormModal";
import { useSelector } from 'react-redux';
import logo from './assets/readytable-logo.png'
import ProfileButton from './ProfileButton';
import "./NavigationBar.css"; // Import your CSS file for styling

function NavigationBar() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navigation-bar">
      <div className="logo-button">
        <Link to="/">
          <img src={logo} alt="Logo" id="nav-logo"/>
        </Link>
      </div>
      <div className="right-side">
        {sessionUser ? (
          <ProfileButton user={sessionUser} />
        ) : (
          <LoginFormModal />
        )}
        {/* Add your search button here */}
        {/* <button className="search-button">Search</button> */}
      </div>
    </nav>
  );
}

export default NavigationBar;
