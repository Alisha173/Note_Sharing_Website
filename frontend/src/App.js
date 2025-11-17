import React, { useEffect, useState } from "react";
import Login from "./Login";
import Notes from "./Notes";
import Signup from "./Signup";


function App() {
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  // Runs only once when the app loads
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!token ? (
        showSignup ? (
          <>
            <Signup onSignupSuccess={() => setShowSignup(false)} />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowSignup(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={setToken} />
            <p>
              Don’t have an account?{" "}
              <button onClick={() => setShowSignup(true)}>Signup</button>
            </p>
          </>
        )
      ) : (

        <>
          <h2>Welcome!</h2>
          <button onClick={handleLogout}>Logout</button>

          <hr />

          <Notes />
        </>
      )}
    </div>
  );
}

export default App;
