import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
 * Render the user update component.
 * @param {*} props slug of the requested user
 * @returns renders the component
 */
export default function UserUpdate(props) {

  // Define the user variables/constants/states
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const responseOk = useRef(false);
    let navigate = useNavigate();
   
    // Load current user details (will be pre mentioned in input placeholders)
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
    },[]);


    /**
     * Event handler for Submit Profile Changes
     * @param {*} event
     */
    function handleSubmit(event) {

        event.preventDefault();

        // Prepare the payload to be attached to the fetch body
        let formData = new FormData()
        formData.append('username', username);
        formData.append('email', email);
        formData.append('first_name', firstname);
        formData.append('last_name', lastname);
        formData.append('password', password);
        formData.append('password2', password2);
        formData.append('image', image)

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
                    navigate('/my-profile')
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

    /**
     * Form validator (it will be also validated in the backend)
     * @returns
     */
     function validateForm() {
        return email.length > 0 && firstname.length > 0 && lastname.length > 0;
        }

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

    {/* Update User details Fields */}
    <div className="userUpdate mt-5 fs-4 text-white">
        <Form onSubmit={handleSubmit}>
            
            {/* Username update*/}
            <Form.Group className="form-group mt-3" size="lg" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    autoFocus
                    type="username"
                    value={username}
                    placeholder="Please enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            {/* First name input group */}
            <Form.Group className="form-group" size="lg" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={firstname}
                    placeholder="Please enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            {/* Last name input group */}
            <Form.Group className="form-group" size="lg" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={lastname}
                    placeholder="Please enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            {/* Email input form */}
            <Form.Group className="form-group" size="lg" controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={email}
                    placeholder="Please enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group> 

            {/* Password input group */}
            <Form.Group className="form-group" size="lg" controlId="password">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    placeholder="Please create your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            {/* Password confirmation input group */}
            <Form.Group className="form-group" size="lg" controlId="password2">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                    type="password"
                    value={password2}
                    placeholder="Please repeat your password"
                    onChange={(e) => setPassword2(e.target.value)}
                />
            </Form.Group> 

            {/* Image upload group */}
            <Form.Group className="form-group" size="lg">
                <Form.Label>Upload your profile image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Form.Group>

            {/* Signup button group */}
            <div className="text-center button mb-5">
                <Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">Submit Changes</Button>
            </div>
        </Form>        
    </div>
    <div style={{ height: "100vh" }}></div>
</div>
  
)}