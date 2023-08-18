export function SignUpForm({ email, password, setPassword, firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber, continueButtonDisabled, errors }) {
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
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          />
        {errors.password && <p className="error-message">Password {errors.password}</p>}
        <input
          className={inputClass}
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          />
        {errors.first_name && <p className="error-message">First name {errors.first_name}</p>}
        <input
          className={inputClass}
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.last_name && <p className="error-message">Last name {errors.last_name}</p>}
        <input
          className={inputClass}
          type="tel"
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phone_number && <p className="error-message">Phone number {errors.phone_number}</p>}
        <button type="submit" disabled={continueButtonDisabled} className={continueButtonDisabled ? "form-button-disabled" : ""}>
          Sign Up
        </button>
      </div>
    );
  }
  