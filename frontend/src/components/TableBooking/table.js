import React from "react";
import { Button } from "react-bootstrap";

function TableBooking({ data, handleEdit, handleDelete }) {
    return (
        <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-primary">
                            <tr>
                                <th>Tour Name</th>
                                <th>Full Name</th>
                                <th>Guest Size</th>
                                <th>Phone</th>
                                <th>Booking Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((booking) => (
                                <tr key={booking._id}>
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
                                    <td>
                                        
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(booking._id)}
                                        >
                                            Cancel
                                        </Button>
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
