import "../App.css";

/**
 * Delete the review with a DELETE request (only with token, only owner) and reload the current page
 * @param {string} token token of the authenticated user
 * @param {string} slug slug of the camp to which belongs the review
 * @param {number} id id of the review to be deleted
 * @returns review destroy component
 */
export default function ReviewDestroy(props) {

    // Fetch the data to the API
    fetch(`http://127.0.0.1:8000/camps/${props.slug}/reviews/${props.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
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

