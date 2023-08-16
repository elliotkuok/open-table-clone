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

  const handleContinue = (e) => {
    console.log("HandleContinue function executed");
    if (!showPasswordInput) {
      e.preventDefault(); // Prevent default only when form should not be submitted
      if (emailIsValid) {
        setShowPasswordInput(true);
        setErrors([]); // Clear errors when a valid email is entered
      } else {
        setErrors(["Email is not valid"]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HandleSubmit function executed");
    setErrors([]);

    if (!showPasswordInput) {
      // Handle the case when the form is in email entry mode
      // You might want to add any necessary logic for this case
      return;
    }
    
    return dispatch(sessionActions.login({ email, password }))
        .then(() => onClose())
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
              className="form-input"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit" onClick={handleContinue}>
          {actionButtonLabel}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;