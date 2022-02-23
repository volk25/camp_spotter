import "../App.css";

/**
 * Delete the camp with a DELETE request (only with token, only owner) and reload the current page
 * @param {string} token token of the current user
 * @param {string} slug slug of the camp to be deleted
 * @returns camp destroy component
 */
export default function CampDestroy(props) {
		
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

	// Reload the page
	.finally(() => window.location.reload(false))

};


