import React, {useState} from 'react' ;
import { MapContainer,Marker, TileLayer,  useMapEvents} from 'react-leaflet';
import { GetIcon } from '../components/Map';
import LocationMarker from "../components/geolocation.js"


function AddCamp () {
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
        <MapContainer className="map" center={[ 52.3676, 4.9041]} zoom={20} style={{height:"30vh"}}> 
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
            <MapEvents/>
            <Marker position={[latitude, longitude]} icon={GetIcon(50)}/>
            <LocationMarker/>
        </MapContainer>
    )
}
export default AddCamp;