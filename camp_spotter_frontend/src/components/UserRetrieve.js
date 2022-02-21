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
  const [loading, setLoading] = useState(true);

  // Fetch the user details as soon as the page loads
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
    .catch((err) => console.log(err))

    // Set to false the loading variable
    .finally(() => setLoading(false));

},[]);

// If loading variable is still set to true, notify it to the user
if (loading) {
    return <p>Data is loading...</p>;
}

// If data is loaded, render the page
return (

  <div className="background">

  {/* Create user image and username */}
    <div className=" mt-5 text-center">
        <div className= " profileImage text-center">
          <img src={user.image} alt="userImage" className="rounded-circle" height="200"/>
        </div>
        <div style={{ color: "white", margin: "auto" }}>
          <h4 className="nickname text-center">{props.slug}</h4>
        </div>
    </div>

    {/* Create user details */}
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

    {/* Create edit and delete buttons */}
    <div className="mt-5 text-center">
      <Link to="/myprofile/edit">
        <button type="button" class="btn btn-secondary me-5">Edit Profile</button>
      </Link>
      <Link to="/myprofile/delete">
        <button type="button" class="btn btn-danger">Delete Profile</button>
      </Link>
    </div>
    
    <div style={{ height: "100vh" }}></div>
  </div>
  
);
};
