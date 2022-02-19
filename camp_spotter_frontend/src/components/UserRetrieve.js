import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../App.css";

/**
 * Render the user retrieve component.
 * @param {*} props slug of the requested user
 * @returns renders the component
 */
export default function UserRetrieve(props) {

  // Define the user variables/constants/states
  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState();
  const [userLoading, setUserLoading] = useState(true);

  // Define what to do when the component is loaded
  useEffect (() => {
    // Fetch the data from the API
    fetch (`http://127.0.0.1:8000/users/${props.slug}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    // Get the response in a json format and set the data to the user variable
    .then (response => response.json())
    .then (result => setUser(result))

    // Catch the error if present and set it to the error variable
    .catch((err) => setUserError(err))

    // Set to false the loading variable
    .finally(() => setUserLoading(false));

},[]);

// If loading variable is still set to true, notify it to the user
if (userLoading) {
    return <p>Data is loading...</p>;
}
// If there are no errors
if (userError) {
    return <p>An error occurred while loading the User Profile!</p>;
}

// If data is loaded and there are no errors, show the User Profile page
return (
  <div className="background">
  {/* User image + User name */}
    <div className=" mt-5 text-center">
        <div className= " profileImage text-center">
          <img src={user.image} alt="userImage" className="rounded-circle" height="200"/>
        </div>
        <div style={{ color: "white", margin: "auto" }}>
          <h4 className="nickname text-center">{props.slug}</h4>
        </div>
    </div>

    {/* User details */}
    <div className="description mt-5 fs-4 text-white">

        <div className="mb-3 d-flex justify-content-center">
            <div>
              <div className="fw-bold" >First Name:</div>
              <div className="fw-bold" >Last Name:</div>
              <div className="fw-bold">Email:</div>
              <div className="fw-bold" >Date joined:</div>
            </div>
              
              <div>
                <div className="ms-5">{user.first_name}</div>
                <div className="ms-5">{user.last_name}</div>
                <div className="ms-5">{user.email}</div>
                <div className="ms-5">{user.date_joined.slice(0,10)}</div>
              </div>
              
        </div>          
    </div>

  {/* Edit and Delete Profile buttons */}
    <div className="mt-5 text-center">
      <Link to="/edit-profile">
        <button type="button" class="btn btn-secondary me-5">Edit Profile</button>
      </Link>
      
      <button type="button" class="btn btn-danger">Delete Profile</button>

    </div>
    
    <div style={{ height: "100vh" }}></div>
  </div>
  
);
};
