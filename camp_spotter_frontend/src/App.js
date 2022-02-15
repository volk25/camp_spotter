import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MapPage from "./pages/MapPage";
import CampDetailsPage from "./pages/CampDetailsPage";
import AddCampPage from "./pages/AddCampPage";
import Navbar from "./components/Navbar";
import ThankYou from "./pages/ThankYouPage";

/**
 * Renders the whole application.
 * @returns renders the application
 */
export default function App() {

	// Render the application
	return(

		// Inirialize the router
		<Router>
			<div className="App background">

				{/* Render the Navbar component */}
				<div className='position-relative'>
					<Navbar/>
				</div>

				{/* Define the general page routing */}
				<Routes>
					<Route exact path="/" element={<HomePage/>} />
					<Route exact path="/login" element={<LoginPage/>}/>
					<Route exact path="/signup" element={<SignupPage/>}/>
					<Route exact path="/contact" element={<ContactPage/>}/>
					<Route exact path="/map" element={<MapPage/>}/>
					<Route  path="/camps/:slug" element={<CampDetailsPage/>}/>
					<Route exact path="/camps/add" element={<AddCampPage/>}/>
          <Route exact path="/thankyou" element={<ThankYou/>}/>
				</Routes>

      		</div>
    	</Router>
  	);
};