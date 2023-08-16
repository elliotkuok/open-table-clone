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
  const [emailInputClass, setEmailInputClass] = useState("form-input");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false);


  useEffect(() => {
    const isEmailValidInDatabase = async () => {
      try {
        const response = await fetch(`/api/users/check_email?email=${email}`);
        const data = await response.json();
  
        setEmailIsValid(data.isValid);
      } catch (error) {
        console.error("Error checking email validity:", error);
      }
    };

    if (email) {
      isEmailValidInDatabase();
    }
  }, [email]);

  useEffect(() => {
    if (emailIsValid && continueButtonDisabled) {
      setContinueButtonDisabled(false); // Remove the disabled state
    }
  }, [emailIsValid, continueButtonDisabled]);

  useEffect(() => {
    if (continueButtonDisabled) {
      setEmailInputClass("form-input form-input-disabled");
    } else {
      setEmailInputClass("form-input");
    }
  }, [continueButtonDisabled]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = isEmailValid(e.target.value);
    setEmailIsValid(isValid);
    // if (!showPasswordInput) {
    //   setContinueButtonDisabled(!isValid);
    // }
  };

  const handleContinue = (e) => {
    if (!showPasswordInput) {
      e.preventDefault(); // Prevent default only when form should not be submitted
      if (emailIsValid) {
        setShowPasswordInput(true);
        setErrors([]); // Clear errors when a valid email is entered
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
        // .then(() => onClose())
        .then(() => {
          onClose(); // Close the modal on successful login
        })
        .catch(async (res) => {
            let data;
            try {
            // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
            } catch {
                data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
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
              className={emailInputClass}
              type="text"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
          )}
          {showPasswordInput && emailIsValid && (
            <input
              className="form-input"
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
          disabled={continueButtonDisabled} // Add the disabled attribute
          className={continueButtonDisabled ? "form-button-disabled" : ""}
        >
          {actionButtonLabel}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;