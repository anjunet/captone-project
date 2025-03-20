import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../actions/reservationActions'
import './Reservations.css';

const Reservations = () => {
  const dispatch = useDispatch();

  const userReservations = useSelector((state) => state.reservationList);
  const { loading, error, reservations } = userReservations;

  useEffect(() => {
    // Fetch reservations when the component loads
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="reservations-page">
      <h2>Your Reservations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-item">
              <h3>{reservation.location}</h3>
              <p>{reservation.date}</p>
              <p>{reservation.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
