import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
    const [error, setError] = useState();

    /**
    * Review form validator
    * @returns
    */
    function validateReviewForm() {
        return title.length > 0 && rating > 0;
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

        // Process the response if it is ok, otherwise throw an error
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText) 
            };
            return response.json()
        })

        // Refresh the page
        .then(() => {
            window.location.reload(false)
        })

        // Catch the error if present, and specify an error message for it
        .catch(err => {
            console.log(err)
            if (err.message === 'Bad Request') {
                setError('Please fill in all the required fields');
            }
        })

    };

    // Render the component
    return (
        
        <div>

            {/* Initialize the form */}
            <Form onSubmit={handleReviewSubmit}>

                {/* Review title input group */}
                <Form.Group className="form-group" size="lg" controlId="title">
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
    )
};
