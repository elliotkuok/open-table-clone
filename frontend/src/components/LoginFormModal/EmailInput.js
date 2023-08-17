export function EmailInput({ email, handleEmailChange, continueButtonDisabled, handleContinue }) {
    const inputClass = continueButtonDisabled ? "form-input form-input-disabled" : "form-input";

    return (
      <div>
        <h1>Enter your email</h1>
        <p>Enter the email associated with your OpenTable account, or enter a new email.</p>
        <input
          className={inputClass}
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />
        <button
          type="submit"
          onClick={handleContinue}
          disabled={continueButtonDisabled}
          className={continueButtonDisabled ? "form-button-disabled" : ""}
        >
          Continue
        </button>
      </div>
    );
  }
  