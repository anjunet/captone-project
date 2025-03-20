import React, { useState, useEffect } from "react";
import AdminHeader from './AdminHeader';
import AdminHeaderNavigation from './AdminHeaderNavigation'
import axios from "axios";
import "./AdminViewReservations.css";

const AdminViewReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation._id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <AdminHeaderNavigation />
    <div className="view-reservations-container">
      <h1>View Reservations</h1>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Booked by</th>
            <th>Property Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.bookedBy}</td>
              <td>{reservation.propertyName}</td>
              <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(reservation._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminViewReservations;
