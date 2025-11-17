import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        setMessage("Invalid email or password");
        return;
      }

      const token = await response.text();
      localStorage.setItem("token", token);
      setMessage("Login successful!");

      onLogin(token);
    } catch (error) {
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
