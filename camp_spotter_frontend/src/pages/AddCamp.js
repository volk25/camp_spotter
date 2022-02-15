import React, {useState} from 'react' ;
import { MapContainer,Marker, TileLayer,  useMapEvents} from 'react-leaflet';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GetIcon } from '../components/Map';
import LocationMarker from "../components/geolocation.js";
import "../App.css";


export default function AddCamp() {

  // Setting states for input forms
  const [campname, setCampName] = useState("");
  const [campdescription, setCampDescription] = useState("");
  const [locationdescription, setLocationDescription] = useState("");
  const [image, setImage] = useState("");

  function validateForm() {
    return locationdescription.length > 0 && campdescription.length > 0 && campname.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  //Setting states for map component 
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat)
        setLongitude(e.latlng.lng)
      },
    });
    return false;
}
  return (
    <div className="addcampForm">

      <h1 className="text-center text-white">Create New Camp</h1>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group mt-5" size="lg" controlId="campname">
          <Form.Label>Camp Name</Form.Label>
          <Form.Control
            autoFocus
            type="campname"
            value={campname}
            placeholder="Please enter the name of the camp"
            onChange={(e) => setCampName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" size="lg" controlId="campdescription">
          <Form.Label>Camp Description</Form.Label>
          <Form.Control
            autoFocus
            type="campdescription"
            value={campdescription}
            style={{ height: 100}}
            placeholder="Please give a short description of this camp here"
            onChange={(e) => setCampDescription(e.target.value)}
          />
        </Form.Group>

        <div>
            <div className='mt-2 mb-2 text-white'>Click on map to set the exact location of the camp</div>

            <MapContainer className="map" center={[ 52.3676, 4.9041]} zoom={20} style={{height:"30vh"}}> 
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                    contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
                <MapEvents/>
                <Marker position={[latitude, longitude]} icon={GetIcon(50)}/>
                <LocationMarker/>
            </MapContainer>
        </div>

        <Form.Group className="form-group" size="lg" controlId="locationdescription">
          <Form.Label>Camp Location Description</Form.Label>
          <Form.Control
            autoFocus
            type="locationdescription"
            value={locationdescription}
            style={{ height: 80}}
            placeholder="Please describe in a few sentence how to find this spot"
            onChange={(e) => setLocationDescription(e.target.value)}
          />
        </Form.Group>

        

        <Form.Group className="form-group" size="lg" controlId="image">
          <Form.Label className="custom-file-label" htmlFor="inputGroupFile01">Upload camp photo</Form.Label>
          <Form.Control
            autoFocus
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <div className="text-center button mb-5">
        <Button size="lg" type="submit" disabled={!validateForm()} className="mt-3 btn-success">
          Submit
        </Button>
        </div>
      </Form>
      <div style={{ height: "5vh" }}> </div>
    </div>
  );
}

