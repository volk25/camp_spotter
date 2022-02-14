import React from "react";
import "../App.css";
import ObtainAuthToken from '../components/ObtainAuthToken';

/**
 * Render the login page.
 * @returns renders the login page
 */
export default function Login() {

  // Render the page
  return (

    <div className="Login">

      {/* Create a header */}
      <h1 className="login-header">Login</h1>
      <div style={{ height: "50vh" }}></div>

      {/* Authentication form */}
      <div>
        <ObtainAuthToken/>
      </div>

      <div style={{ height: "100vh" }}> </div>
    </div>
  );
}
