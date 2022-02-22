import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import MyProfilePage from "./pages/MyProfilePage";
import EditMyProfilePage from "./pages/EditMyProfilePage";
import DeleteMyProfilePage from "./pages/DeleteMyProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CampDetailsPage from "./pages/CampDetailsPage";
import EditCampPage from "./pages/EditCampPage";
import DeleteCampPage from "./pages/DeleteCampPage";
import AddCampPage from "./pages/AddCampPage";
import MyCampsPage from "./pages/MyCampsPage"
import ThankYouPage from "./pages/ThankYouPage";

/**
 * Render the whole application.
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

			{/* Initialize the router and define the routing*/}
			<Router>
				<Routes>

					{/* Genearal purpose pages */}
					<Route exact path="/" element={<HomePage />}/>
					<Route exact path="/map/:positionSlug" element={<MapPage />}/>
					<Route exact path="/contact" element={<AboutUsPage />}/>
					<Route exact path="/thankyou" element={<ThankYouPage />}/>

					{/* Authorization pages */}
					<Route exact path="/login" element={<LoginPage />}/>
					<Route exact path="/signup" element={<SignupPage />}/>

					{/* User profile pages */}
					<Route exact path="/myprofile" element={<MyProfilePage />}/>
					<Route exact path="/myprofile/edit" element={<EditMyProfilePage />}/>
					<Route exact path="/myprofile/delete" element={<DeleteMyProfilePage />}/>

					{/* Camps pages */}
					<Route exact path="/mycamps" element={<MyCampsPage />}/>
					<Route exact path="/camps/add" element={<AddCampPage />}/>
					<Route exact path="/camps/:slug" element={<CampDetailsPage />}/>
					<Route exact path="/camps/:slug/edit" element={<EditCampPage />}/>
					<Route exact path="/camps/:slug/delete" element={<DeleteCampPage />}/>

				</Routes>
			</Router>
			
		</div>

  	);
};