export function SignUpForm({ email, password, setPassword, firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber, continueButtonDisabled }) {
    const inputClass = continueButtonDisabled ? "form-input form-input-disabled" : "form-input";

    return (
      <div>
        <h1>Sign up for an account</h1>
        <p>No account with your email was found. Please fill out this form to create a new account</p>
        <input
            className="form-input email-default"
            type="text"
            defaultValue={email}
            readOnly
        />
        <input
          className={inputClass}
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={inputClass}
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className={inputClass}
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className={inputClass}
          type="tel"
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit" disabled={continueButtonDisabled} className={continueButtonDisabled ? "form-button-disabled" : ""}>
          Sign Up
        </button>
      </div>
    );
  }
  