import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MyProfilePage from "./pages/MyProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
					<Route exact path="/" element={<HomePage />}/>

					<Route exact path="/my-profile" element={<MyProfilePage />}/>
					{/* <Route exact path="/my-camps" element={<MyCampsPage />}/> */}
					<Route exact path="/edit-profile" element={<EditProfilePage/>}/>

					<Route exact path="/login" element={<LoginPage />}/>
					<Route exact path="/signup" element={<SignupPage />}/>
					<Route exact path="/contact" element={<AboutUsPage />}/>

					<Route  path="/camps/:slug" element={<CampDetailsPage />}/>
					<Route exact path="/camps/add" element={<AddCampPage />}/>

					<Route exact path="/thankyou" element={<ThankYouPage />}/>
				</Routes>
			</Router>
			
		</div>

  	);
};