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
    <div className="container-fluid py-4" style={{ height: "100vh", backgroundColor: "#282422" }}>
      {!token ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          {showSignup ? (
            <div style={{ width: "100%", maxWidth: "400px" }}>
               <Signup onSignupSuccess={() => setShowSignup(false)} />
               <p className="text-center mt-3">
                 Already have an account? <button className="btn btn-link text-warning" onClick={() => setShowSignup(false)}>Login</button>
               </p>
            </div>
          ) : (
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Login onLogin={setToken} />
              <p className="text-center mt-3">
                Don’t have an account? <button className="btn btn-link text-warning" onClick={() => setShowSignup(true)}>Signup</button>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="container h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-shrink-0">
            <h2 style={{ color: "#D8C3A5" }}>Welcome Back!</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
          <hr style={{ borderColor: "#555" }} className="flex-shrink-0" />
          
          {/* Pass remaining height control to Notes */}
          <div className="flex-grow-1" style={{ overflow: "hidden" }}>
            <Notes />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;