import { useState , useEffect} from 'react';
import {Marker, Popup, useMap} from 'react-leaflet';
import { Icon } from 'leaflet'

//giving link to the "you are here icon because it doesn't load automatically for some reason"
const myIcon = new Icon({
  iconUrl: require('../images/Icons/geoposition_icon.png'),
  iconSize: [42]
  })

// reads user's current geolocation and opens the map on that location, puts blue marker with popup "you are here" 
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMap();

  useEffect(()=> {
    map.locate().on("locationfound", function(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom() );
    });
  },[]);
    

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default LocationMarker
