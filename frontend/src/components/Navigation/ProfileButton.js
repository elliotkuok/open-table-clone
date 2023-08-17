import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Fetch user data using the user's id or email
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

  return (
    <button id="profile-button">
      <span style={{ marginTop: '3px' }}>
        {firstInitial}{lastInitial}
      </span>
    </button>
  );
}

export default ProfileButton;