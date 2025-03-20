import { Route, Routes } from 'react-router-dom';
import "./App.css";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './actions/userActions';
import DiscoverExperiences from "./components/Home/DiscoverExperiences";
import HeroBanner from "./components/Home/HeroBanner";
import Inspiration from "./components/Home/Inspiration";
import ShopAirBnb from "./components/Home/ShopAirBnb";
import Filter from "./components/Header/Filter";
import ProfileSection from "./components/Header/ProfileSection";
import QuestionsAboutHosting from "./components/Home/QuestionsAboutHosting";
import FutureGetaways from "./components/Home/FutureGetaways";
import Layout from "./components/Footer/Layout";
import LoginPage from "./components/UserLogin/LoginPage";
import AdminCreateListing from "./components/Admin/AdminCreateListing";
import ListingsPage from "./components/ListingsPage/ListingsPage";
import LocationHeader from './components/LocationPage/LocationHeader';
import LocationCards from './components/LocationPage/LocationCards';
import Reservations from './components/Reservations';
import ViewListings from './components/Admin/AdminViewListings';
import AdminViewReservations from './components/Admin/AdminViewReservations';
import LocationDetails from './components/LocationDetails/LocationDetails';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      dispatch(login(JSON.parse(userInfo)));
    }
  }, [dispatch]);
  
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <ProfileSection />
              <Filter />
              <Layout>
                <HeroBanner />
                <Inspiration />
                <DiscoverExperiences />
                <ShopAirBnb />
                <QuestionsAboutHosting />
                <FutureGetaways />
              </Layout>
            </>
          } 
        />
        
        <Route 
          path="/locations" 
          element={
            <>
              <LocationHeader />
              <LocationCards />
            </>
          } 
        />

        <Route 
          path="/listings" 
          element={
            <>
              <LocationHeader />
              <ListingsPage />
            </>
          } 
        />

        <Route 
          path="/location-details/:id" 
          element={<LocationDetails />} 
        />
        
        <Route 
          path="/admin/login" 
          element={<LoginPage />} 
        />
        

        <Route 
          path="/view-reservations" 
          element={<Reservations />} 
        />

{/* Admin Section */}

        <Route 
          path="/admin/view-listings" 
          element={<ViewListings />} 
        />

        <Route 
          path="/admin/view-reservations" 
          element={<AdminViewReservations />} 
        />    

        <Route 
          path="/admin/create-listing" 
          element={<AdminCreateListing />} 
        />
      </Routes>
    </div>
  );
}

export default App;
