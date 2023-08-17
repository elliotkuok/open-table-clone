import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`); // Replace with your API endpoint
      const userData = await response.json();
      setFirstName(userData.user.firstName);
      setLastName(userData.user.lastName);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const firstInitial = firstName ? firstName.charAt(0) : '';
  const lastInitial = lastName ? lastName.charAt(0) : '';

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(sessionActions.logout()); // Dispatch your logout action here
  };

  return (
    <div className="dropdown-container">
      <button id="profile-button" onClick={toggleDropdown}>
        <span style={{ marginTop: '3px' }}>
          {firstInitial}{lastInitial}
        </span>
        <i className="fa fa-caret-down"></i>
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
            <h1>Hello, {firstName}!</h1>
            <Link to={`/user/${user.id}`} className="dropdown-link">
                My Profile
            </Link>
            <a className="dropdown-link" style={{color: '#da3743' }} onClick={handleLogout}>
                Sign out
            </a>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;