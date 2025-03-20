import React, { useState } from "react";
import AdminHeader from './AdminHeader';
import AdminHeaderNavigation from './AdminHeaderNavigation'
import "./AdminCreateListing.css";

const AdminCreateListing = () => {
  const [formData, setFormData] = useState({
    listingName: "",
    location: "",
    description: "",
    rooms: "",
    bath: "",
    type: "",
    additionalInfo: "",
    enhancedCleaning: false,
    selfCheckIn: false,
    amenities: "",
    guests: "",
    bedrooms: "",
    bathrooms: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Your form has been submitted!", formData);
    setFormData({
      listingName: "",
      location: "",
      description: "",
      rooms: "",
      bath: "",
      type: "",
      additionalInfo: "",
      enhancedCleaning: false,
      selfCheckIn: false,
      amenities: "",
      guests: "",
      bedrooms: "",
      bathrooms: "",
    });
  };

  return (
    <div> 
    <AdminHeader />
    <AdminHeaderNavigation />
    <div className="create-listing-container">
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit} className="create-listing-form">
        <div className="left-column">
          <label htmlFor="listingName">Listing Name</label>
          <input
            type="text"
            id="listingName"
            name="listingName"
            value={formData.listingName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            className="location-select"
            value={formData.location}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a location</option>
            <option value="Johannesburg">Johannesburg</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Durban">Durban</option>
            <option value="Pretoria">Pretoria</option>
            <option value="Port Elizabeth">Port Elizabeth (Gqeberha)</option>
            <option value="Bloemfontein">Bloemfontein</option>
            <option value="East London">East London</option>
            <option value="Kimberley">Kimberley</option>
            <option value="Polokwane">Polokwane</option>
            <option value="Nelspruit">Nelspruit (Mbombela)</option>
            <option value="Pietermaritzburg">Pietermaritzburg</option>
            <option value="Rustenburg">Rustenburg</option>
            <option value="George">George</option>
            <option value="Stellenbosch">Stellenbosch</option>
            <option value="Sandton">Sandton</option>
            <option value="Umhlanga">Umhlanga</option>
            <option value="Ballito">Ballito</option>
            <option value="Knysna">Knysna</option>
            <option value="Hermanus">Hermanus</option>
            <option value="Paarl">Paarl</option>
            <option value="Plettenberg Bay">Plettenberg Bay</option>
            <option value="Jeffreys Bay">Jeffreys Bay</option>
            <option value="Clarens">Clarens</option>
            <option value="Sutherland">Sutherland</option>
            <option value="Oudtshoorn">Oudtshoorn</option>
            <option value="Hazyview">Hazyview</option>
            <option value="Bela-Bela">Bela-Bela (Warmbaths)</option>
            <option value="Thohoyandou">Thohoyandou</option>
            <option value="Tzaneen">Tzaneen</option>
            <option value="Upington">Upington</option>
            <option value="Springbok">Springbok</option>
            <option value="Richards Bay">Richards Bay</option>
            <option value="Mossel Bay">Mossel Bay</option>
            <option value="Centurion">Centurion</option>
            <option value="Sun City">Sun City</option>
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={10}
            required
          ></textarea>

          {/* Check box Section */}
          <div className="check-boxes">
            <label>
              <input
                type="checkbox"
                name="enhancedCleaning"
                checked={formData.enhancedCleaning}
                onChange={handleInputChange}
              />
              Enhanced Cleaning
            </label>

            <label>
              <input
                type="checkbox"
                name="selfCheckIn"
                checked={formData.selfCheckIn}
                onChange={handleInputChange}
              />
              Self Check-in
            </label>
          </div>

          <label htmlFor="amenities">Amenities</label>
          <div className="amenities">
            <input
              type="text"
              id="amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={() => {/* Handle add amenities */}}>Add</button>
          </div>
        </div>

        <div className="right-column">
          <div className="form-selections">
            <div className="input-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </div>

          <div className="accommodation-details">
            <div className="input-group">
              <label htmlFor="guests">Guests</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
              >
                <option value="" disabled>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
              >
                <option value="" disabled>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
              >
                <option value="" disabled>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          <div className="images-button">
            <button type="button">Upload Images</button>
         

          <label htmlFor="additionalInfo"></label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows="4"
            cols="50"
            value={formData.additionalInfo}
            onChange={handleInputChange}
          ></textarea>
 </div>
          {/* Listing buttons */}
          <div className="listing-buttons-container">
            <button type="submit">Create</button>
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AdminCreateListing;
