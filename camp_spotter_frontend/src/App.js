import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MapPage from "./pages/MapPage";
import CampDetailsPage from "./pages/CampDetailsPage";
import AddCampPage from "./pages/AddCampPage";
import ThankYouPage from "./pages/ThankYouPage";


/**
 * Renders the whole application.
 * @returns renders the application
 */
export default function App() {

	// Render the application
	return(

		<div className="App background">

			{/* Add a tostify container for showing the toast notifications */}
			<ToastContainer
			position="bottom-left"
			autoClose={5000}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			pauseOnHover
			/>

			{/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>


			{/* Inirialize the router and define the routing*/}
			<Router>
				<Routes>
					<Route exact path="/" element={<HomePage/>} />
					<Route exact path="/login" element={<LoginPage/>}/>
					<Route exact path="/signup" element={<SignupPage/>}/>
					<Route exact path="/contact" element={<ContactPage/>}/>
					<Route exact path="/map" element={<MapPage/>}/>
					<Route  path="/camps/:slug" element={<CampDetailsPage/>}/>
					<Route exact path="/camps/add" element={<AddCampPage/>}/>
					<Route exact path="/thankyou" element={<ThankYouPage/>}/>
				</Routes>
			</Router>
			
		</div>

  	);
};