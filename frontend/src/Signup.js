import React, { useState } from "react";

function Signup({ onSignupSuccess }) {
  const [name, setName] = useState(""); // New State for Name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password }) // Send Name
      });

      if (response.ok) {
        setMessage("Signup successful! You can now login.");
        onSignupSuccess(); 
      } else {
        const text = await response.text();
        setMessage(text);
      }
    } catch (err) {
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div className="container mt-5 auth-container" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Signup</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Full Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button className="btn btn-primary w-100" onClick={handleSignup}>
        Signup
      </button>

      <p className="text-center mt-3 text-danger">{message}</p>
    </div>
  );
}

export default Signup;