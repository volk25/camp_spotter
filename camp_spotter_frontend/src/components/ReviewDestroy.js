import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";

/**
* Delete a review.
* @param {*} props slug of the camp to which the review belongs and the review id
* @returns deletes the review
*/
export default function ReviewDestroy(props) {

        // Define the parameters coming from outside the component
        const token = localStorage.getItem('token')

        // Fetch the data to the API
        fetch(`http://127.0.0.1:8000/camps/${props.slug}/reviews/${props.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`
            }
        })

        // Process the response
        .then(response => response.json())

        // Reload the page
        .then(() => window.location.reload(false))

        // Catch the other errors if present
        .catch(err => console.log(err)) 

};

