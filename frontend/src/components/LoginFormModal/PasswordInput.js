export function PasswordInput({ password, setPassword, continueButtonDisabled }) {
    const inputClass = continueButtonDisabled ? "form-input form-input-disabled" : "form-input";

    return (
      <div>
        <h1>Verify it's you</h1>
        <p>Enter your password</p>
        <input
          className={inputClass}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={continueButtonDisabled} className={continueButtonDisabled ? "form-button-disabled" : ""}>
          Log In
        </button>
      </div>
    );
  }
  