import React, { useRef, useState, useEffect , useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import { GetIcon } from './Map';
import "../App.css";

/**
 * Render the camp update component.
 * @param {*} props token and slug of the requested camp
 * @returns renders the component
 */
export default function CampUpdate(props) {

    // Define the camp variables/constants/states
    const camp = useRef();
    const [latitudeMarker, setLatitudeMarker] = useState("");
	const [longitudeMarker, setLongitudeMarker] = useState("");
    const [loading, setLoading] = useState(true)
    const responseOk = useRef(false);
    let navigate = useNavigate();
   
    // ######### CAMP RETRIEVE ##########

    // Retrieve the current camp details (these will be pre filled in the input)
    useEffect(() => {

        // Fetch the data from the API
        fetch (`http://127.0.0.1:8000/camps/${props.campSlug}/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    
        // Get the response in a json format and set the data to the camp variable
        .then(response => response.json())
        .then(result => {
            camp.current = result;
            setLongitudeMarker(camp.current.longitude);
            setLatitudeMarker(camp.current.latitude)
        })

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    };

    // ######### CAMP UPDATE ##########

    /**
    * Form validator (it will be also validated in the backend)
    * @returns
    */
    function validateForm() {
        return true
        // return camp.current.title.length > 0 && camp.current.main_body > 0 && camp.current.position_body > 0;
    };

    /**
     * Event handler for Submit Camp Changes
     * @param {*} event
     */
    function handleSubmit(event) {

        event.preventDefault();

        // Prepare the payload to be attached to the fetch body
        let formData = new FormData()
        formData.append('title', camp.current.title);
        formData.append('main_body', camp.current.main_body);
        formData.append('position_body', camp.current.position_body);
        formData.append('latitude', camp.current.latitude);
        formData.append('longitude', camp.current.longitude);

        // The retrieved camp image field is just a path (this is needed for showing the image) while we want to upload the picture only if is a file 
        if (typeof(camp.current.image)==="string") {
            formData.append('image', '')
        } else {
            formData.append('image', camp.current.image)
        };
            
        // Fetch the data from the API
        fetch (`http://127.0.0.1:8000/camps/${props.campSlug}/`, {
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
                navigate(`/camps/${props.campSlug}/`)
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

    // Updating states of longitude and latitude in case user changes the camp position
	const MapEvents = () => {
		useMapEvents({
			click(e) {
				camp.current.latitude = e.latlng.lat
				camp.current.longitude = e.latlng.lng
                setLatitudeMarker(e.latlng.lat)
				setLongitudeMarker(e.latlng.lng)
                console.log(camp.current.longitude)
			},
		});
		return false;
	};
  
    // Render the component
    return (
        <div className="addcampForm">

            {/* Initialize the form */}
            <Form onSubmit={handleSubmit}>

                {/* Camp name input group */}
                <Form.Group className="form-group mt-5" size="lg" controlId="title">
                    <Form.Label>Camp Name *</Form.Label>
                    <Form.Control
                    autoFocus
                    type="text"
                    defaultValue={camp.current.title}
                    placeholder="Please enter the name of the camp"
                    onChange={(e) => {camp.current.title = e.target.value}}/>
                </Form.Group>

                {/* Camp main description input group */}
                <Form.Group className="form-group" size="lg" controlId="mainBody">
                    <Form.Label>Camp Description *</Form.Label>
                    <Form.Control
                    autoFocus
                    type="text"
                    defaultValue={camp.current.main_body}
                    style={{ height: 100}}
                    placeholder="Please give a short description of this camp here"
                    onChange={(e) => {camp.current.main_body = e.target.value}}/>
                </Form.Group>

                {/* Map pin input group */}
                <div>
                    <div className='mt-2 mb-2 text-white'>Click on map to set the exact location of the camp *</div>
                        <MapContainer className="map" center={[camp.current.latitude, camp.current.longitude]} zoom={20} style={{height:"30vh"}}> 
                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                                contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
                            <MapEvents />
                            <Marker position={[latitudeMarker, longitudeMarker]} icon={GetIcon(50)}/>
                        </MapContainer>
                </div>

                {/* Position description input group */}
                <Form.Group className="form-group" size="lg" controlId="locationdescription">
                    <Form.Label>Camp Location Description</Form.Label>
                    <Form.Control
                    autoFocus
                    type="text"
                    defaultValue={camp.current.position_body}
                    style={{ height: 80}}
                    placeholder="Please describe in a few sentence how to find this spot"
                    onChange={(e) => {camp.current.position_body = e.target.value}}/>
                </Form.Group>

                {/* Image upload group */}
                <Form.Group className="form-group" size="lg" controlId="image">
                    <Form.Label>Change camp photo</Form.Label>
                    <Form.Control
                    type="file"
                    onChange={(e) => {camp.current.image = e.target.value}}/>
                </Form.Group>

                {/* Submit button froup */}
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

    )
};