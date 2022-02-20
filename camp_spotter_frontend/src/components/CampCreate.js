import React, { useRef, useState } from 'react';
import { MapContainer,Marker, TileLayer,  useMapEvents} from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GetIcon } from './Map';
import LocationMarker from "./Geolocation.js";
import "../App.css";

/**
 * Renders the camp-create form, sends the form data in the body of a POST request (only with token).
 * @param {*} props token of the authenticated user
 * @returns camp create component
 */
export default function CampCreate(props) {

	// Define the variables/constants/states
	const [title, setTitle] = useState("");
	const [mainBody, setMainBody] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [positionBody, setPositionBody] = useState("");
	const [image, setImage] = useState("");
	const responseOk = useRef(false);
	let navigate = useNavigate();

	/**
	 * Form validator (it will be also validated in the backend)
	 * @returns
	 */
	function validateForm() {
		return title.length > 0 && mainBody.length > 0 && latitude !== "" && longitude !== "";
	};

	/**
	 * Event handler for Camp submission details submission
	 * @param {*} event
	 */
	function handleSubmit(event) {
		
		event.preventDefault();

		// Prepare the payload to be attached to the fetch body
		let formData = new FormData()
		formData.append('title', title);
		formData.append('main_body', mainBody);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);
		formData.append('position_body', positionBody);
		formData.append('image', image)

		// Fetch the data to the API
		fetch('http://127.0.0.1:8000/camps/', {
			method: 'POST',
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
				navigate('/thankyou')
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

	// Setting states for map component 
	const MapEvents = () => {
		useMapEvents({	
			click(e) {
				setLatitude(e.latlng.lat)
				setLongitude(e.latlng.lng)
			},
		});
		return false;
	};

	// Render the component
  	return(

    	<div className="addcampForm">

			{/* Initialize the form */}
			<Form onSubmit={handleSubmit}>

				{/* Camp name input group */}
				<Form.Group className="form-group mt-5" size="lg" controlId="title">
					<Form.Label>Camp Name *</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={title}
						placeholder="Please enter the name of the camp"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>

				{/* Camp main description input group */}
				<Form.Group className="form-group" size="lg" controlId="mainBody">
					<Form.Label>Camp Description *</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={mainBody}
						style={{ height: 100}}
						placeholder="Please give a short description of this camp here"
						onChange={(e) => setMainBody(e.target.value)}
					/>
				</Form.Group>

				{/* Map pin input group */}
				<div>
					<div className='mt-2 mb-2 text-white'>Click on map to set the exact location of the camp *</div>
					<MapContainer className="map" center={[ 52.3676, 4.9041]} zoom={20} style={{height:"30vh"}}> 
						<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
							contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
						<MapEvents/>
						<Marker position={[latitude, longitude]} icon={GetIcon(50)}/>
						<LocationMarker/>
					</MapContainer>
				</div>

				{/* Position description input group */}
				<Form.Group className="form-group" size="lg" controlId="locationdescription">
					<Form.Label>Camp Location Description</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={positionBody}
						style={{ height: 80}}
						placeholder="Please describe in a few sentence how to find this spot"
						onChange={(e) => setPositionBody(e.target.value)}
					/>
				</Form.Group>

				{/* Image upload group */}
				<Form.Group className="form-group" size="lg" controlId="image">
					<Form.Label>Upload camp photo</Form.Label>
					<Form.Control
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</Form.Group>

				{/* Required fields warning */}
				<div className="bottom-text">
					Fields marked with  *  are the required ones.
				</div>

				{/* Submit button froup */}
				<div className="text-center button mb-5">
					<Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">Submit</Button>
				</div>

			</Form>

    	</div>
  	);
};

