import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { SignUpForm } from './SignUpForm';

function LoginForm({onClose}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailInDatabase, setEmailInDatabase] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
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
          setEmailInDatabase(data.isValid);
        } catch (error) {
          console.error("Error checking email validity:", error);
        }
      })();
    }

    if (emailInDatabase && !showPasswordInput) {
      setContinueButtonDisabled(false);
    }

    if (password) {
      setContinueButtonDisabled(false);
    }
  }, [email, emailInDatabase, password, showPasswordInput]);

  useEffect(() => {
    if (emailInDatabase && continueButtonDisabled && !showPasswordInput) {
      setContinueButtonDisabled(false);
    }
  }, [emailInDatabase, continueButtonDisabled]);

  useEffect(() => {
    setContinueButtonDisabled(false);
  }, [password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = isEmailValid(e.target.value);
    setEmailInDatabase(isValid);
  };

  const handleContinue = (e) => {
    if (!showPasswordInput) {
      e.preventDefault(); // Prevent default only when form should not be submitted
      if (isEmailValid(email)) {
        setSubmittedEmail(email);
        setContinueButtonDisabled(false);
        setShowPasswordInput(true);
        if (emailInDatabase) {
        } else {
          // Render the form with additional inputs for new user
          // You can set any default values for the inputs here
          setPassword("");
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setShowPasswordInput(true);
          setShowAdditionalInputs(true);
        }
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

    if (emailInDatabase) {
      // Log in with the provided email and password
      dispatch(sessionActions.login({ email, password }))
        .then(() => {
          onClose();
        })
        .catch(async (res) => {
          // Handle login errors
          // ...
        });
    } else {
      // Create a new user with the provided information
      const newUser = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      };

      // Dispatch an action to create a new user in the database
      dispatch(sessionActions.signup(newUser))
        .then(() => {
          onClose();
        })
        .catch(async (res) => {
          // Handle user creation errors
          // ...
        });
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
    setShowAdditionalInputs(false);
    setContinueButtonDisabled(false);
    setEmail(submittedEmail);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const modalTitle = showPasswordInput ? "Verify it's you" : "Enter your email";
  const modalSubtitle = showPasswordInput ? "Enter your password to continue." : 
  "Enter the email associated with your OpenTable account, or enter a new email.";

  return (
    <div className="login-form">
      {showPasswordInput && (
      <i className="back-icon" onClick={handleBack}>
        &lt; {/* Use HTML entity for "<" */}
      </i>
    )}

<form onSubmit={handleSubmit}>
      {showPasswordInput ? (
        showAdditionalInputs ? (
          <SignUpForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            getInputClass={getInputClass}
          />
        ) : (
          <PasswordInput password={password} setPassword={setPassword} continueButtonDisabled={continueButtonDisabled} />
        )
      ) : (
        <EmailInput email={email} handleEmailChange={handleEmailChange} continueButtonDisabled={continueButtonDisabled} handleContinue={handleContinue} />
      )}
    </form>
      <Link to="#" className="demo-user" onClick={handleDemoLogin}>
        Use demo user instead
      </Link>
    </div>
  );
}

export default LoginForm;