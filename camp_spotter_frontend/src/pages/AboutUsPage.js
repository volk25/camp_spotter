import React from "react";
import ContactForm from "../components/ContactForm";

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

      {/* About Us Text */}
      <div className="background text-center text-white mt-5">
      
        <h1 className="contact-header">About Us</h1>
      </div>

      {/* About us text */}
      <div className="text-white  text-center mt-5 h5 w-50 aboutUs">
      While being a true nature lovers and loving camping, we realized that there are not enough reliable information sources about where to stay overnight in a truly wild and beautiful place, but also a safe one.  And we mean places, where you will not be surrounded with lots of other tents and campers. We wanted to create a community of camping lovers, who will not only share their favorite wild camping spots, but also will be able to interact and comment/review those spots, where they have previously stayed.  And all this in order to inspire other people to spend some time close to the nature and wake up with a stunning view. That’s why we decided to build an application which sets the basis for a great start.
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
