import {useEffect} from 'react' ;
import {useMap} from 'react-leaflet';
import {GeoSearchControl} from 'leaflet-geosearch';

// This is a component of a search bar, that will be inserted inside the main map 
export default function SearchControl(props) {

	const map = useMap();
 
   	useEffect(() => {
     	const searchControl = new GeoSearchControl({
       		provider: props.provider,
       		...props
     	});
     	map.addControl(searchControl);
     	return () => map.removeControl(searchControl);
   	}, [map, props]);
 
   	return null;
   
 };