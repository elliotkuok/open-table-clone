import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({onClose}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false);
  // const [createAccountButtonDisabled, setCreateAccountButtonDisabled] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const getInputClass = () => {
    return continueButtonDisabled ? "form-input form-input-disabled" : "form-input";
  };

  useEffect(() => {
    if (email) {
      (async () => {
        try {
          const response = await fetch(`/api/users/check_email?email=${email}`);
          const data = await response.json();
          setEmailIsValid(data.isValid);
        } catch (error) {
          console.error("Error checking email validity:", error);
        }
      })();
    }

    if (emailIsValid && !showPasswordInput) {
      setContinueButtonDisabled(false);
    }

    if (password) {
      setContinueButtonDisabled(false);
    }
  }, [email, emailIsValid, password, showPasswordInput]);

  useEffect(() => {
    if (emailIsValid && continueButtonDisabled && !showPasswordInput) {
      setContinueButtonDisabled(false);
    }
  }, [emailIsValid, continueButtonDisabled]);

  useEffect(() => {
    setContinueButtonDisabled(false);
  }, [password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = isEmailValid(e.target.value);
    setEmailIsValid(isValid);
  };

  const handleContinue = (e) => {
    if (!showPasswordInput) {
      e.preventDefault(); // Prevent default only when form should not be submitted
      if (isEmailValid(email)) {
        setSubmittedEmail(email);
        setShowPasswordInput(true);
        setContinueButtonDisabled(false);
      } else {
        setContinueButtonDisabled(true); 
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (!showPasswordInput) {
      return;
    }

    return dispatch(sessionActions.login({ email, password }))
      .then(() => {
        onClose();
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        setContinueButtonDisabled(true); 
      });
  };

  const handleDemoLogin = async () => {
    const demoUserCredentials = {
      email: 'demo@user.io', 
      password: 'password', 
    };

    try {
      await dispatch(sessionActions.login(demoUserCredentials));
      onClose(); // Close the modal after successful demo login
    } catch (error) {
      console.error('Error logging in with demo account:', error);
    }
  };

  const handleBack = () => {
    setShowPasswordInput(false);
    setContinueButtonDisabled(false);
    setEmail(submittedEmail);
  };

  // const handleCreateAccount = async () => {
  //   setErrors([]);
  
  //   if (!isEmailValid(email)) {
  //     setCreateAccountButtonDisabled(true);
  //     return;
  //   }
  
  //   const newUser = {
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //   };
  
  //   try {
  //     await dispatch(sessionActions.createUser(newUser));
  //     onClose(); // Close the modal after successful account creation
  //   } catch (error) {
  //     console.error('Error creating account:', error);
  //     setCreateAccountButtonDisabled(true);
  //   }
  // };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const modalTitle = showPasswordInput ? "Verify it's you" : "Enter your email";
  const modalSubtitle = showPasswordInput ? "Enter your password to continue." : 
  "Enter the email associated with your OpenTable account, or enter a new email.";
  const actionButtonLabel = showPasswordInput ? "Log In" : "Continue";

  return (
    <div className="login-form">
      {showPasswordInput && (
      <i className="back-icon" onClick={handleBack}>
        &lt; {/* Use HTML entity for "<" */}
      </i>
    )}
      <h1>{modalTitle}</h1>
      <p>{modalSubtitle}</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
          
      {showPasswordInput ? (
        // Render password input and back button
        <div>
          <input
            className={getInputClass()}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          <button type="submit">Log In</button>
        </div>
      ) : (
        // Render email input and continue button
        <div>
          <input
            className={getInputClass()}
            type="text"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
            required
            />
          <button
              type="button"
              onClick={handleContinue}
              disabled={continueButtonDisabled}
              className={continueButtonDisabled ? "form-button-disabled" : ""}
            >
              Continue
            </button>
        </div>
      )}

      {/* Render additional inputs for creating an account */}
      {/* {emailIsValid && !showPasswordInput && (
        <div>
          <input
            className={getInputClass()}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
          {/* Add more input fields for first name, last name, and phone number */}
          {/* <input
            className={getInputClass()}
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className={getInputClass()}
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className={getInputClass()}
            type="text"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleCreateAccount}
            disabled={createAccountButtonDisabled}
            className={createAccountButtonDisabled ? "form-button-disabled" : ""}
          >
            Create Account
          </button>
        </div>
      )} */}
      
      </form>
      <Link to="#" className="demo-user" onClick={handleDemoLogin}>
        Use demo user instead
      </Link>
    </div>
  );
}

export default LoginForm;