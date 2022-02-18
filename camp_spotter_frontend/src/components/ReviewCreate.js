import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
* Renders the review-create form, sends the form data in the body of a POST request (only with token).
* @param {*} props slug of the camp to which the review should belong
* @returns renders the component
*/
 export default function ReviewCreate(props) {

    // Define the parameters coming from outside the component
    const token = localStorage.getItem('token')

    // Define the add review variables/constants/states
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState("");
    const responseOk = useRef(false);

    /**
    * Review form validator
    * @returns
    */
    function validateReviewForm() {
        return title.length > 0 && body.length > 0;
    };

    /**
    * Event handler for Review submission
    * @param {*} event
    */
    function handleReviewSubmit(event) {

        event.preventDefault();

        // Fetch the data to the API (keep in mind that the current requesting address should be authorized in the API)
        fetch(`http://127.0.0.1:8000/camps/${props.slug}/reviews/`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                title: title,
                body: body,
                rating: rating
            })
        })

		// Process the response
		.then(response => {
			if (response.ok) {
                responseOk.current = true
            };
			return response.json()
		})

		// Reload the page if the reponse was ok, otherwise show toasts with the errors
		// The page is reloaded in order for the submitted review to be shown
		.then((result) => {
			if (responseOk.current) {
				window.location.reload(false)
			} else {
				for(var i in result){
					for(var k in result[i]){
						toast.error(result[i][k])
					}
				}
			}
		})

		// Catch the other errors if present
		.catch(err => console.log(err))

    };

    // Render the component
    return (
        
        <div>

            {/* Restrict the possibility to leave reviews only with token */}
            { token ? 
            
                <div>

                    {/* Initialize the form */}
                    <Form onSubmit={handleReviewSubmit}>

                        {/* Review title input group */}
                        <Form.Group className="form-group " size="lg" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        {/* Review body input group */}
                        <Form.Group className="form-group" size="lg" controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                type="text"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </Form.Group>

                        {/* Review rating input group */}
                        <Form.Group className="form-group" size="lg" controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="text"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </Form.Group>

                        {/* Login button group */}
                        <div className="text-center">
                            <Button size="lg" type="submit" disabled={!validateReviewForm()} className="mt-3 btn-success">Submit</Button>
                        </div>

                    </Form>
                
                </div>

            :

                <div className='text-white fw-italic fs-5'>
                Please <Link to="/login" style={{ color: '#055d3d', textDecoration: 'inherit'}}><span className="fw-bold">Login</span></Link> or <Link to="/signup" style={{ color: '#055d3d', textDecoration: 'inherit'}}><span className="fw-bold">Signup</span></Link> for leaving a review!</div>
            
            }

        </div>
    )
};
