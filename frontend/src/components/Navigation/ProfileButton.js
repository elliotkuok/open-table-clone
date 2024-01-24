import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const history = useHistory();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
      const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setShowDropdown(false);
          }
      };

      document.addEventListener('click', handleOutsideClick);

      return () => {
          document.removeEventListener('click', handleOutsideClick);
      };
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
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button id="profile-button" onClick={toggleDropdown}>
        <span style={{ marginTop: '4px', marginLeft: '2px'}}>
          {firstInitial}{lastInitial}
        </span>
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
            <h4>Hello, {firstName}!</h4>
            <Link to={`/user/${user.id}`} className="dropdown-link">
                My Profile
            </Link>
            <a className="dropdown-link" id="signout-link" onClick={handleLogout}>
                Sign out
            </a>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;