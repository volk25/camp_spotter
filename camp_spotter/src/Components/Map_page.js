import React, {Component} from 'react' ;
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';



function MyMap() {
    const position = [52.3676, 4.9041] //position of Amsterdam at which map will always open

    return (
        //adding the map and making it fit 100% of the page
        <MapContainer className="map" center={position} zoom={10} style={{height:"100vh", width: "100%"}}> 
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
            contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

{/* adding markers to the map. Markers are taken from campings list below */}
            {campings.map((camping) => (
                <Marker position={camping.position} icon={GetIcon(50)}>
                <Popup>
                    {camping.name}
                </Popup>

            </Marker> ))}   
        </MapContainer>      
    )
}

// Sets custom icon to every camp spot on the map instead of default pin
function GetIcon(_iconSize) {
    return  L.icon({
            iconUrl: require("../Static/Icons/tent_icon_for_map.png"),
            iconSize: [_iconSize]
        })
}

//List of camping spots
const campings = [
    {
    "name": "Wild Camping Dam Square", 
    "position": [52.37, 4.89]
    },
    {
    "name": "Perfect camp spot Amsterdam Nord", 
    "position": [52.39, 4.92]
    }
]

export default MyMap;