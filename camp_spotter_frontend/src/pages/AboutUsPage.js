import React from "react";
import ContactForm from "../components/ContactForm";
import NavBar from "../components/NavBar";

/**
* Render the contact page.
*  * The following components are used:
* - ContactForm
* @returns renders the page
*/
export default function AboutUsPage() {

  // Render the page
  return (

    <div>

      {/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>

      {/* About Us Text */}
      <div className="background text-center text-white mt-5">
      
        <h1 className="contact-header">About Us</h1>
      </div>

      {/* About us text */}
      <div className="text-white  text-center mt-5 h5 w-50 aboutUs">
      Are you a camping lover? Do you truly love nature, enjoy hiking and eager to explore and/or share amazing camping spots? Than Camp Spotter is the right place for you!  We are a community of camping lovers, and here we share our favourite wild camping spots with the world. Spots, were you will not be surrounded with lots of tents and campers around you.  Places, where you will be able to be alone and enjoy the power of nature.  Join us today!
      </div>

      {/* Insert the contact form */}
      <div className="background  text-white mt-5">
        <h1 className="contact-header text-center">Contact</h1>
        <ContactForm />
        <div style={{ height: "100vh" }}></div>
      </div>

    </div>
  );
}
