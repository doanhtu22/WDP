import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [tourData, setTourData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    // Fetch dashboard data on component mount
    axios.get('/admin')
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching dashboard data:', error));

    // Fetch all tours
    axios.get('/admin/tours')
      .then(response => setTourData(response.data))
      .catch(error => console.error('Error fetching tours:', error));

    // Fetch all bookings
    axios.get('/admin/bookings')
      .then(response => setBookingData(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>User Count: {userData.userCount}</h2>
        <h2>Tour Count: {userData.tourCount}</h2>
        <h2>Booking Count: {userData.bookingCount}</h2>
      </div>

      <div>
        <h2>All Tours</h2>
        <ul>
          {tourData.map(tour => (
            <li key={tour._id}>{tour.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>All Bookings</h2>
        <ul>
          {bookingData.map(booking => (
            <li key={booking._id}>{booking.startDate} - {booking.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;