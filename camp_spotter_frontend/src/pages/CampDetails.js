import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";
import { useParams } from 'react-router-dom'
import CampRetrieve from '../components/CampRetrieve';
import ReviewList from '../components/ReviewList';
import ReviewCreate from '../components/ReviewCreate';

/**
 * Render the camp details page. 
 * @returns renders the page
 */
 export default function CampDetails() {

    // Define the parameters coming from outside
    const params = useParams()
 
    // Render the page
    return (
        
        <div> 

            <div className='overlay'></div>
            <div className=' container campDetails position-relative'>           
 
                {/* General details of the camp of the camp*/}
                <div>
                    <CampRetrieve slug={params.slug}/>
                </div>

                {/* Insert the list with reviews of the camp, if present */}
                <div className='text-white fw-bold fs-2'>Reviews</div>
                <div>
                    <ReviewList slug={params.slug}/>
                </div>

                {/* Insert an add-review section  */}
                <div className='text-white fw-bold fs-2'>Add your review</div>
                <div>
                    <ReviewCreate slug={params.slug}/>
                </div>
                            
            </div> 
            <div style={{ height: "50vh" }}></div>

        </div>
    )
};
