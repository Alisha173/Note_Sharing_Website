import React, { useEffect, useState } from "react";
import Login from "./Login";
import Notes from "./Notes";
import Signup from "./Signup";

function App() {
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    /* Updated Background Color to #37353E */
    <div className="container-fluid py-5" style={{ minHeight: "100vh", backgroundColor: "#37353E" }}>
      {!token ? (
        <div className="d-flex justify-content-center">
          {showSignup ? (
            <div style={{ width: "100%", maxWidth: "400px" }}>
               <Signup onSignupSuccess={() => setShowSignup(false)} />
               <p className="text-center mt-3">
                 Already have an account? <button className="btn btn-link" onClick={() => setShowSignup(false)}>Login</button>
               </p>
            </div>
          ) : (
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Login onLogin={setToken} />
              <p className="text-center mt-3">
                Don’t have an account? <button className="btn btn-link" onClick={() => setShowSignup(true)}>Signup</button>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Updated Text Color to #D3DAD9 */}
            <h2 style={{ color: "#D3DAD9" }}>Welcome Back!</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
          {/* Updated Divider Color to #715A5A */}
          <hr style={{ borderColor: "#715A5A" }} />
          <Notes />
        </div>
      )}
    </div>
  );
}

export default App;