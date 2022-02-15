import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
 * Render the add review component.
 * @param {*} props slug of the camp to which the review should belong
 * @returns renders the component
 */
 export default function ReviewCreate(props) {

    // Define the parameters coming from outside the component
    const token = localStorage.getItem('token')

    // Define the add review variables/constants/states
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");
    const [reviewRating, setReviewRating] = useState("");
    const [reviewError, setReviewError] = useState();

    /**
    * Review form validator
    * @returns
    */
    function validateReviewForm() {
        return reviewTitle.length > 0 && reviewRating > 0;
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
                title: reviewTitle,
                body: reviewBody,
                rating: reviewRating
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
                setReviewError('Please fill in all the required fields');
            }
        })

    };

    // Render the component
    return (
        
        <div>

            {/* Initialize the form */}
            <Form onSubmit={handleReviewSubmit}>

                {/* Review title input group */}
                <Form.Group className="form-group" size="lg" controlId="reviewTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                    />
                </Form.Group>

                {/* Review body input group */}
                <Form.Group className="form-group" size="lg" controlId="reviewBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                    />
                </Form.Group>

                {/* Review rating input group */}
                <Form.Group className="form-group" size="lg" controlId="reviewBody">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="text"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(e.target.value)}
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
