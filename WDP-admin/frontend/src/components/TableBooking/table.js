import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from 'axios';

function TableBooking({ data, handleDelete }) {
    const [filteredData, setFilteredData] = useState(data);
    const [filterText, setFilterText] = useState('');

    const handleConfirm = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/booking/confirm-and-send-email/${id}`, { status: 'confirmed' });
            if (response.data.success) {
                // Update the status in the local state
                setFilteredData((prevData) =>
                    prevData.map((booking) =>
                        booking._id === id ? { ...booking, status: 'confirmed' } : booking
                    )
                );
                console.log("Booking confirmed and email sent successfully");
            } else {
                console.error("Failed to confirm booking and send email");
            }
        } catch (error) {
            console.error("Error confirming booking and sending email:", error);
        }
    };
    const handleCancel = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/booking/${id}`, { status: 'cancelled' });
            if (response.data.success) {
                // Update the status in the local state
                setFilteredData((prevData) =>
                    prevData.map((booking) =>
                        booking._id === id ? { ...booking, status: 'cancelled' } : booking
                    )
                );
                console.log("Booking confirmed successfully");
            } else {
                console.error("Failed to confirm booking");
            }
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };

    const handleFilterChange = (e) => {
        const text = e.target.value;
        setFilterText(text);
        const filtered = data.filter((booking) =>
            booking._id.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Filter by Booking ID"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </InputGroup>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-primary">
                            <tr>
                                <th>ID</th>
                                <th>Tour Name</th>
                                <th>Full Name</th>
                                <th>Guest Size</th>
                                <th>Phone</th>
                                <th>Booking Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.tourName}</td>
                                    <td>{booking.fullName}</td>
                                    <td>{booking.guestSize}</td>
                                    <td>{booking.phone}</td>
                                    <td>
                                        {new Date(booking.bookAt).toLocaleString("VN", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </td>
                                    <td>{booking.status}</td>
                                    <td>
                                        {booking.status === 'pending' && (
                                            <Button
                                                variant="success"
                                                onClick={() => handleConfirm(booking._id)}
                                            >
                                                Confirm
                                            </Button>
                                        )}
                                       
                                    </td>
                                    <td>
                                    {booking.status === 'pending' && ( 
                                        <Button
                                            variant="danger"
                                            onClick={() => handleCancel(booking._id)}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableBooking;
