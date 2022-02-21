import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

/**
 * Renders the camp-destroy confirmation, deletes the camp with a DELETE request (only with token, only owner).
 * @param {*} props token of the authenticated user and slug of the camp to be deleted
 * @returns camp destroy component
 */
export default function CampDestroy(props) {

	// Define the variables/constants/states
	let navigate = useNavigate();

	/**
	 * Event handler for element deletion
	 * @param {*} event
	 */
	function handleDelete(event) {
		
		// Fetch the data to the API
		fetch(`http://127.0.0.1:8000/camps/${props.slug}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${props.token}`
			}
		})

        // Process the response
        .then(response => response.json())

        // Catch the other errors if present
        .catch(err => console.log(err))

		// Navigate back to MyCamps page
		.finally(() => navigate('/mycamps'))

	};

	// Render the component
  	return(

    	<div className="addcampForm">

			{/* Create the confirmation message and the Cancel and Delete Profile buttons */}
			<div className="mt-5 text-center">
				<div className="text-white mt-5 mb-5 h5">Are you sure that you want to permanently delete this camp?</div>
				<Link to={`/mycamps`}>
					<button type="button" class="btn btn-secondary me-5">Cancel</button>
				</Link>
      			<button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
    		</div>

    	</div>

  	);
};

