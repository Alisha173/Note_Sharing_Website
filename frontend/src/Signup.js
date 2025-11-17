import React, { useState } from "react";

function Signup({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      setMessage("Email and password required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setMessage("Signup successful! You can now login.");
        onSignupSuccess(); // move to login screen
      } else {
        const text = await response.text();
        setMessage(text);
      }
    } catch (err) {
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Signup</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={handleSignup}>
        Signup
      </button>

      <p className="text-center mt-3 text-danger">{message}</p>
    </div>
  );

}

export default Signup;
