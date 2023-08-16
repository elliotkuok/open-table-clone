import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm({onClose}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false);

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
      if (emailIsValid) {
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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const modalTitle = showPasswordInput ? "Verify it's you" : "Enter your email";
  const modalSubtitle = showPasswordInput ? "Enter your password to continue." : 
  "Enter the email associated with your OpenTable account, or new email.";
  const actionButtonLabel = showPasswordInput ? "Log In" : "Continue";

  return (
    <div className="login-form">
      <h1>{modalTitle}</h1>
      <p>{modalSubtitle}</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
          {!showPasswordInput && (
            <input
              className={getInputClass()}
              type="text"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
          )}
          {showPasswordInput && emailIsValid && (
            <input
            className={getInputClass()}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

        <button
          type="submit"
          onClick={handleContinue}
          disabled={continueButtonDisabled}
          className={continueButtonDisabled ? "form-button-disabled" : ""}
        >
          {actionButtonLabel}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;