import React, {useState, useEffect} from 'react' ;
import 'bootstrap/dist/css/bootstrap.css';
import "./CampDetails.css";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { GetIcon } from '../../components/Map';
import Navbar from "../../components/Navbar/Navbar";


function CampDetails () {
    //Setting a state for camps, data loading  and errors
    const [result, setCamps] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    

    useEffect ( () => {
        fetch ('http://localhost:3000/oneCampDetails.json')
        .then (resp => resp.json())
        .then (
            (result) => {
            setCamps(result);
        })
        .catch((err) => {
            setError(err);
            console.log(err)
        })
        .finally(() => {
            setLoading(false);
          });
        
    },[]); 

    const [reviewData, setReviews] = useState([]); 
    useEffect ( () => {
        fetch ('http://localhost:3000/campReviews.json')
        .then (resp => resp.json())
        .then (
            (reviewData) => {
            setReviews(reviewData);
        })      
        .catch((err) => {
            setError(err);
            console.log(err)
        })
        .finally(() => {
            setLoading(false);
          });
        
    },[]); 
    //in case data will be fetched slowly, "data loading" will appear on the screen.
    if (loading) {
        return <p>Data is loading...</p>;
      }
    //if json doesn't have an array, this error will be displayed on the screen. For map function to work, json has to be an array
    if (error || !Array.isArray(result)) {
    return <p>There was an error loading your data!</p>;
    }
    // if everything went well, display our page
    
    return (
        
        <div> 
        
        
        
            <div className='overlay'></div>
            <div className='container position-relative'>
                <div className='mb-3'><Navbar /></div>
            
                
                {result.map(camp => (
                    <div key={camp.id}>
                        {/* Camp image with camp name displayed on it */}
                        <div className="position-relative text-center" >
                            <img src={camp.image} className="radius" width="100%" height= "200" alt="mainCampImage" />
                            <div className='box bg-secondary bg-opacity-75'>
                                <p className="position-absolute  bottom-0 start-50 translate-middle-x  text-white fs-2">{camp.name}</p>
                            </div>
                        </div>
                        

                        {/* Main camp description */}
                        <div className='mt-3 mb-3 p-3 text-white h5 bg-secondary bg-opacity-50 radius'>{camp.main_body}</div>  

                        {/* Location description on the left and map on the right*/}
                        <div className='d-flex mb-3'>
                            <div className= 'radius p-3 mb-2 bg-secondary bg-opacity-50 text-white h6 w-50'>{camp.position_body}</div>  
                            <div className='w-50 ms-2 radius'>
                                <MapContainer className="map" center={[camp.latitude, camp.longitude]} zoom={20} style={{height:"30vh"}}> 
                                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                                        contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
                                        <Marker position={[camp.latitude, camp.longitude]} icon={GetIcon(50)}> </Marker>
                                </MapContainer>      
                            </div>                           
                        </div> 
                    </div>
                ))},


                    {/* Reviews part */}
                    {reviewData.map(review=> (
                        
                    <div key={review.id}>
                        <div className='text-white fw-bold fs-2'>Reviews</div> 
                        <div className='d-flex justify-content-evenly w-20'  >
                            <div className='me-3'>
                                <img src={review.image}  alt="user image" width="70" height= "70"></img>
                                <div className='w-25 text-center text-black'>{review.author}</div>
                            </div>
                            
                            <div className= 'p-3 mb-2 bg-secondary bg-opacity-50 text-white rounded-pill w-75'>{review.body}</div>   
                        </div>    
                    </div>  
                ))} ,
                    
            
            </div>  
        </div>
    )}
       

export default CampDetails