import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
 * Render the user update component.
 * @param {string} token token of the current user
 * @param {string} slug slug of the user to be edited
 * @returns renders the component
 */
export default function UserUpdate(props) {

    // Define the user variables/constants/states
    const user = useRef();
    const [loading, setLoading] = useState(true)
    const responseOk = useRef(false);
    let navigate = useNavigate();
   
    // ######### USER RETRIEVE ##########

    // Retrieve the current user details (these will be pre filled in the input)
    useEffect(() => {

        // Fetch the data from the API
        fetch(`http://127.0.0.1:8000/users/${props.slug}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    
        // Get the response in a json format and set the data to the user variable
        // password and password2 fields are not retrieved but they need to be present in the PUT request
        .then(response => response.json())
        .then(result => {
            user.current = result;
            user.current.password = '';
            user.current.password2 = '';
        })

        // Set to false the loading variable
        .finally(() => setLoading(false));

    });

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

    // ######### USER UPDATE ##########

    /**
    * Form validator (it will be also validated in the backend)
    * @returns
    */
    function validateForm() {
        return user.current.email.length > 0 && user.current.password === user.current.password2;
    };

    /**
     * Event handler for Submit Profile Changes
     * @param {*} event
     */
    function handleSubmit(event) {

        event.preventDefault();

        // Prepare the payload to be attached to the fetch body
        let formData = new FormData()
        formData.append('username', user.current.username);
        formData.append('email', user.current.email);
        formData.append('first_name', user.current.first_name);
        formData.append('last_name', user.current.last_name);
        formData.append('password', user.current.password);
        formData.append('password2', user.current.password2);

        // The retrieved user image field is just a path (this is needed for showing the image) while we want to upload the picture only if is a file 
        if (typeof(user.current.image)==="string") {
            formData.append('image', '')
        } else {
            formData.append('image', user.current.image)
        };
            
        // Fetch the data from the API
        fetch (`http://127.0.0.1:8000/users/${props.slug}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${props.token}`
            },
            body: formData          
        })

        // Process the response
        .then(response => {
            if (response.ok) {
                responseOk.current = true
            };
            return response.json()
        })

        // Redirect if the reponse was ok, otherwise show toasts with the errors
        .then((result) => {
            if (responseOk.current) {
                navigate('/myprofile')
            } else {
                for(var i in result){
                    for(var k in result[i]){
                        toast.error(`${i}: ${result[i][k]}`)
                    }
                }
            }
        })

        // Catch the other errors if present
        .catch(err => console.log(err))

    };

    // Render the component
    return (

        <div className="background">

            {/* Show the user image and the username */}
            <div className=" mt-5 text-center">
                <div className= "profileImage text-center position-relative">
                    <img src={user.current.image} alt="userImage" className="rounded-circle" height="200" width="200"/>          
                </div>
                <div style={{ color: "white", margin: "auto" }}>
                    <h4 className="nickname text-center">{props.slug}</h4>
                </div>
            </div>

            {/* Create the form */}
            <div className="userUpdate mt-5 fs-4 text-white">

                {/* Initialize the form */}
                <Form onSubmit={handleSubmit}>

                    {/* First name input group */}
                    <Form.Group className="form-group" size="lg" controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        defaultValue={user.current.first_name}
                        placeholder="Please enter your first name"
                        onChange={(e) => {user.current.first_name = e.target.value}}/>
                    </Form.Group>

                    {/* Last name input group */}
                    <Form.Group className="form-group" size="lg" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        defaultValue={user.current.last_name}
                        placeholder="Please enter your last name"
                        onChange={(e) => {user.current.last_name = e.target.value}}/>
                    </Form.Group>

                    {/* Email input form */}
                    <Form.Group className="form-group" size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        defaultValue={user.current.email}
                        placeholder="Please enter your email address"
                        onChange={(e) => {user.current.email = e.target.value}}/>
                    </Form.Group> 

                    {/* Password input form */}
                    <Form.Group className="form-group" size="lg" controlId="email">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        defaultValue={user.current.password}
                        placeholder="Please change your password if required"
                        onChange={(e) => {user.current.password = e.target.value}}/>
                    </Form.Group>

                    {/* Confirm password group */}
                    <Form.Group className="form-group" size="lg" controlId="email">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                        autoFocus
                        type="text"
                        defaultValue={user.current.password2}
                        placeholder="Please confirm your new password"
                        onChange={(e) => {user.current.password2 = e.target.value}}/>
                    </Form.Group>

                    {/* Image upload group */}
                    <Form.Group className="form-group" size="lg">
                        <Form.Label>Upload your profile image</Form.Label>
                        <Form.Control
                        type="file"
                        onChange={(e) => {user.current.image = e.target.files[0]}}/>
                    </Form.Group>

                    {/* Submit button group */}
                    <div className="text-center button mb-5">  
                        <Button 
                        size="lg" 
                        type="submit" 
                        disabled={!validateForm()} 
                        className="mt-3 btn-success">
                        Submit
                        </Button>
                    </div>

                </Form> 

            </div>

            <div style={{ height: "100vh" }}></div>

        </div>

    )
};