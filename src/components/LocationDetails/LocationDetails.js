import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LocationDetails.css";
import { UserContext } from "../Context/UserContext";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import DiningOutlinedIcon from "@mui/icons-material/DiningOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PedalBikeOutlinedIcon from "@mui/icons-material/PedalBikeOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import WhereYouSleep from "../../assets/locationDetails/Sleep.png";
import Footer from "../Footer/Footer";
import Reviews from "../Listing/Reviews";
import LocationDetailsHeader from "../LocationDetails/LocationDetailsHeader";
import HostSection from "../Listing/HostSection";
import ThingsToKnow from "../Listing/ThingsToKnow";

const LocationDetails = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);

  // Constants for pricing
  const weeklyDiscount = 28;
  const discount = 28;
  const cleaningFee = 62;
  const serviceFee = 83;
  const taxesAndFees = 29;

  // Functions

  // Calculate total price function
  const calculateTotalPrice = () => {
    if (!listing || !listing.price || !checkInDate || !checkOutDate) {
      return 0;
    }

    const pricePerNight = parseFloat(listing.price);

    // Calculate the number of nights
    const nights =
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);

    if (isNaN(nights) || nights <= 0) return 0;

    const basePrice = pricePerNight * nights;

    const total =
      (basePrice - discount + cleaningFee + serviceFee + taxesAndFees) *
      parseInt(guests, 10);

    return total;
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setTotal(calculateTotalPrice());
    } else {
      setTotal(0); // Reset total if dates are not valid
    }
  }, [checkInDate, checkOutDate, guests, listing]);

  // Ensure the dates are valid before calculation
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  // Fetch listing details
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/location-details/${id}`
        );
        setListing(response.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        setError("Error fetching location details");
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  // Handle reservation
  const handleReserve = async () => {
    if (!userInfo) {
      alert("Please log in to make a reservation.");
      return;
    }

    if (!checkInDate || !checkOutDate || !guests) {
      alert("Please fill in all fields to make a reservation.");
      return;
    }

    const reservationsData = {
      bookedBy: userInfo.id, // Use user's ID
      propertyName: listing.name,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: guests,
      price: listing.price,
      total: total,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/reservations",
        reservationsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Reservation successful!");
        // Optionally, navigate to another page or update UI
      } else {
        alert("Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      alert(
        "An error occurred while making the reservation. Please try again later."
      );
    }
  };

  const renderDatePicker = (
    label,
    selectedDate,
    onChangeDate,
    selectsStart,
    startDate,
    endDate,
    minDate = new Date() // Default minimum date is today
  ) => (
    <div className="date-picker">
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChangeDate}
        selectsStart={selectsStart}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate} // Set minimum date to prevent past dates
        className="date-input"
        dateFormat="yyyy-MM-dd" // Format the date
      />
    </div>
  );

  // Booking calendar

  const handleDateChange = (date, isCheckIn) => {
    if (isCheckIn) {
      setCheckInDate(date);
      if (checkOutDate && date > checkOutDate) {
        setCheckOutDate(null);
      }
    } else {
      setCheckOutDate(date);
    }

    // Update total only if both dates are selected
    if (checkInDate && checkOutDate) {
      setTotal(calculateTotalPrice());
    } else {
      setTotal(0); // Reset total if either date is missing
    }
  };

  const formatDateRange = () => {
    if (checkInDate && checkOutDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return `${checkInDate.toLocaleDateString(
        undefined,
        options
      )} - ${checkOutDate.toLocaleDateString(undefined, options)}`;
    }
    return "Select dates";
  };

  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>No listing found</p>;

  return (
    <div>
      <LocationDetailsHeader />
      <div className="location-details-container">
        <div className="location-details">
          <div className="details-header">
            <h1>{listing.title}</h1>
            <p>
              <StarRateIcon /> {listing.rating} {listing.reviews} -{" "}
              {listing.locationName}
            </p>
          </div>
          <div className="image-section-container">
            <div className="main-image">
              <img src={listing.img1} alt="Main Image 1" />
            </div>
            <div className="small-images">
              <div className="small-images-row">
                <img src={listing.img2} alt="Small Image 2" />
                <img src={listing.img3} alt="Small Image 3" />
              </div>
              <div className="small-images-row">
                <img src={listing.img4} alt="Small Image 4" />
                <img src={listing.img5} alt="Small Image 5" />
              </div>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="left-column">
            <div className="listing-highlights">
              <div className="highlight-container">
                <div className="highlight-heading">
                  <p className="hosted-by">Entire Rental Hosted by Ghazel</p>
                  <p className="details">{listing.rooms}</p>
                </div>
                <div className="highlight-details-container">
                  <div className="highlight">
                    <HomeOutlinedIcon className="highlight-icon" />
                    <div>
                      <h3>{listing.title}</h3>
                      <p>You might share the room with other people.</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <AutoAwesomeOutlinedIcon className="highlight-icon" />
                    <div>
                      <h3>Enhanced Clean</h3>
                      <p>
                        This host is committed to Airbnb's 5-step enhanced
                        cleaning process.
                      </p>
                    </div>
                  </div>
                  <div className="highlight">
                    <DoorFrontOutlinedIcon className="highlight-icon" />
                    <div>
                      <h3>Self check-in</h3>
                      <p>Check yourself in with the keypad.</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <CalendarTodayOutlinedIcon className="highlight-icon" />
                    <div>
                      <h3>Free cancellation before 3:00 PM on Jul 14</h3>
                      <p>Get a full refund if you change your mind.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="listing-overview">
              <p>{listing.description}</p>
              <p className="show-more-button">
                Show more <ArrowForwardIosIcon />
              </p>
            </div>

            <div className="sleeping-arrangements">
              <h2>Where you'll sleep</h2>
              <img
                src={WhereYouSleep}
                alt="Bedroom"
                className="sleeping-arrangements__image"
              />
              <div className="sleeping-arrangements__details">
                <h3>Bedroom</h3>
                <p>1 queen bed</p>
              </div>
            </div>

            <div className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid-container">
                <div className="amenities-grid">
                  <div className="amenity-item">
                    <LocalFloristOutlinedIcon />
                    <p>Garden view</p>
                  </div>
                  <div className="amenity-item">
                    <WifiOutlinedIcon />
                    <p>Free wifi</p>
                  </div>
                  <div className="amenity-item">
                    <AdjustOutlinedIcon />
                    <p>Free washer - in building</p>
                  </div>
                  <div className="amenity-item">
                    <AirOutlinedIcon />
                    <p>Central air conditioning</p>
                  </div>
                  <div className="amenity-item">
                    <KitchenOutlinedIcon />
                    <p>Refrigerator</p>
                  </div>
                </div>
                <div className="amenities-grid">
                  <div className="amenity-item">
                    <DiningOutlinedIcon />
                    <p>Kitchen</p>
                  </div>
                  <div className="amenity-item">
                    <PetsOutlinedIcon />
                    <p>Pets allowed</p>
                  </div>
                  <div className="amenity-item">
                    <LocalLaundryServiceOutlinedIcon />
                    <p>Dryer</p>
                  </div>
                  <div className="amenity-item">
                    <SecurityOutlinedIcon />
                    <p>Security cameras on property</p>
                  </div>
                  <div className="amenity-item">
                    <PedalBikeOutlinedIcon />
                    <p>Bicycles</p>
                  </div>
                </div>
              </div>
              <button className="show-all-button">Show all 37 amenities</button>
            </div>

            {/* Booking calendar section */}
            <div className="booking-calendar-section">
              <h2>7 nights in New York</h2>
              <span>{formatDateRange()}</span>

              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="booking-calendar"
              >
                <div>
                  <p>Check-in</p>
                  <Calendar
                    onChange={(date) => handleDateChange(date, true)}
                    value={checkInDate}
                  />
                </div>

                <div>
                  <p>Check-out</p>
                  <Calendar
                    onChange={(date) => handleDateChange(date, false)}
                    value={checkOutDate}
                    minDate={checkInDate} // Ensure checkout is after check-in
                  />
                </div>
              </div>
              <span className="clear-dates" onClick={handleClearDates}>
                Clear dates
              </span>
            </div>
          </div>

          <div className="right-column">
            <div className="reservation-card">
              <div className="price-info">
                <h2>R{listing.price} / night</h2>
                <p>
                  <StarRateIcon /> {listing.rating} · {listing.reviews}
                </p>
              </div>
              <div className="booking-info">
                {renderDatePicker(
                  "Check-in",
                  checkInDate,
                  (date) => {
                    setCheckInDate(date);
                    if (checkOutDate && date >= checkOutDate) {
                      setCheckOutDate(null); // Reset check-out date if it’s before the new check-in date
                    }
                  },
                  true, // selectsStart
                  checkInDate,
                  checkOutDate
                )}
                {renderDatePicker(
                  "Check-out",
                  checkOutDate,
                  (date) => setCheckOutDate(date),
                  false, // selectsStart = false for end date
                  checkInDate,
                  checkOutDate,
                  checkInDate // Min date for check-out is the selected check-in date
                )}

                <div className="guests-picker">
                  <label>Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
              </div>
              <button className="reserve-button" onClick={handleReserve}>
                Reserve
              </button>
              <div className="price-breakdown">
                <div className="fees">
                  <p>
                    <span class="rate">
                      R{listing.price} x
                      {checkInDate && checkOutDate
                        ? listing.price *
                            ((new Date(checkOutDate) - new Date(checkInDate)) /
                              (1000 * 60 * 60 * 24)) || 0
                        : 0}
                    </span>

                    <span className="total">
                      R{" "}
                      {checkInDate && checkOutDate
                        ? listing.price *
                            ((new Date(checkOutDate) - new Date(checkInDate)) /
                              (1000 * 60 * 60 * 24)) || 0
                        : 0}
                    </span>
                  </p>
                  <p>
                    <span className="label">Weekly discount:</span>{" "}
                    <span className="amount">-R{weeklyDiscount}</span>
                  </p>
                  <p>
                    <span className="label">Cleaning fee:</span>{" "}
                    <span className="amount">R{cleaningFee}</span>
                  </p>
                  <p>
                    <span className="label">Service fee:</span>{" "}
                    <span className="amount">R{serviceFee}</span>
                  </p>
                  <p>
                    <span className="label">Occupancy taxes and fees:</span>{" "}
                    <span className="amount">R{taxesAndFees}</span>
                  </p>
                </div>
              </div>
              <hr />
              <h3 className="total">Total: R{total}</h3>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
      <HostSection />
      <ThingsToKnow />
      <Footer />
    </div>
  );
};

export default LocationDetails;