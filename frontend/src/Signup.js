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
    <div>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button onClick={handleSignup}>Signup</button>

      <p>{message}</p>
    </div>
  );
}

export default Signup;
