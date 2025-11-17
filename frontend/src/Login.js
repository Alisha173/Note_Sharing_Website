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
    <div className="container mt-5 auth-container" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>

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

      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Login
      </button>

      <p className="text-center mt-3 text-danger">{message}</p>
    </div>
  );

}

export default Login;