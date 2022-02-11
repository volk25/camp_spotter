import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./CampDetails.css";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { GetIcon } from '../../components/Map';
import Navbar from "../../components/Navbar/Navbar";
import {useParams} from 'react-router-dom'

/**
 * Render the camp detail page with camp title, image, main body, position body, map position, and reviews. 
 * @returns renders the page
 */
function CampDetails () {

    // Define the parameters coming from outside the component
    const params = useParams()

    // Define the variables/constants/states
    const [campDetails, setCampDetails] = useState([]);
    const [reviewList, setReviewList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [campError, setCampError] = useState();
    const [reviewError, setReviewError] = useState();

    // Define what to do when the page is loaded
    useEffect (() => {

        // Fetch the data from the API (keep in mind that the current requesting address should be authorized in the API)
        fetch (`http://127.0.0.1:8000/camps/${params.slug}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to the campList variable
        .then (response => response.json())
        .then (data => setCampDetails(data))

        // Catch the error if present and set it to the error variable
        .catch((err) => setCampError(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Fetch the data from the API (keep in mind that the current requesting address should be authorized in the API)
        fetch (`http://127.0.0.1:8000/camps/${params.slug}/reviews/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to the reviewList variable
        .then (response => response.json())
        .then (data => setReviewList(data))

        // Catch the error if present and set it to the error variable
        .catch((err) => setReviewError(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }
    // If there are no errors
    if (campError) {
        return <p>An error occurred while loading the Camp details!</p>;
    }
    if (reviewError) {
        return <p>An error occurred while loading the Review List!</p>;
    }

    // Define the reviews snippet to be inserted in the main return
    let reviews = <div className='text-white fw-italic fs-5'>This camp site has no reviews yet...</div>
    if (reviewList.length > 0) {
        reviews = reviewList.map(review => (                      
            <div key={review.id}>                       
                <div className='d-flex justify-content-evenly w-20'  >
                    <div className='me-3'>
                        <img src={review.author_image} alt="user image" width="70" height= "70"/>
                        <div className='w-25 text-center text-black'>
                            {review.author}
                        </div>
                    </div>
                    <div className= 'p-3 mb-2 bg-secondary bg-opacity-50 text-white rounded-pill w-75'>
                        {review.body}
                    </div>   
                </div>    
            </div>  
        ))
    }

    // If data is loaded and there are no errors, show the CampDetails page
    return (
        
        <div> 

            <div className='overlay'></div>
            <div className='container position-relative'>

                {/* Navbar on the page */}
                <div className='mb-3'>
                    <Navbar/>
                </div>
            
                {/* Camp image with camp name displayed on it */}
                <div className="position-relative text-center" >
                    <img src={campDetails.image} className="radius" width="100%" height= "200" alt="mainCampImage" />
                    <div className='box bg-secondary bg-opacity-75'>
                        <p className="position-absolute  bottom-0 start-50 translate-middle-x  text-white fs-2">
                        {campDetails.title}
                        </p>
                    </div>
                </div>
                
                {/* Details of the camp */}
                <div className='mt-3 mb-3 p-3 text-white h5 bg-secondary bg-opacity-50 radius'>
                    {campDetails.main_body}
                </div>
                <div className='d-flex mb-3'>
                    <div className= 'radius p-3 mb-2 bg-secondary bg-opacity-50 text-white h6 w-50'>
                        {campDetails.position_body}
                    </div>  
                    <div className='w-50 ms-2 radius'>
                        <MapContainer className="map" center={[campDetails.latitude, campDetails.longitude]} zoom={20} style={{height:"30vh"}}> 
                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                                contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
                            <Marker position={[campDetails.latitude, campDetails.longitude]} icon={GetIcon(50)}/>
                        </MapContainer>      
                    </div>                           
                </div> 

                {/* Reviews of the camp, if present */}
                <div className='text-white fw-bold fs-2'>Reviews</div>
                <div>
                    {reviews}
                </div>
                            
            </div>  
        </div>
    )}
       

export default CampDetails