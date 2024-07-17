import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import '../../styles/TourManagement.css';

function TourManagement() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        fetch('http://localhost:8000/api/v1/tours', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setTours(data.data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteTour = id => {
        const token = localStorage.getItem("accessToken");
        fetch(`http://localhost:8000/api/v1/tours/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(() => {
                setTours(tours.filter(tour => tour._id !== id));
            })
            .catch(error => console.error(error));
    };

    const handleToggleFeatured = id => {
        const token = localStorage.getItem("accessToken");
        const tour = tours.find(t => t._id === id);
        fetch(`http://localhost:8000/api/v1/tours/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ featured: !tour.featured }),
        })
            .then(response => response.json())
            .then(updatedTour => {
                setTours(tours.map(t => (t._id === id ? updatedTour.data : t)));
            })
            .catch(error => console.error(error));
    };

    if (tours.length === 0) {
        return <h2>No tours</h2>;
    }

    return (
        <div className="tours-container p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Tours Management</h2>
            <Link to="/admin/create-tour">
                <Button variant="primary" className="mb-3">Create Tour</Button>
            </Link>
            <Table striped bordered hover>
                <thead className="bg-gray-200">
                    <tr>
                        <th>Photo</th>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Distance</th>
                        <th>Max Group Size</th>
                        <th>Price</th>
                        <th>Featured</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map(tour => (
                        <tr key={tour._id} className="bg-white hover:bg-gray-50">
                              <td><img src={tour.photo} alt={tour.title} style={{ width: '100px' }} /></td>
                            <td>{tour.title}</td>
                            <td>{tour.address}</td>
                            <td>{tour.distance}</td>
                            <td>{tour.maxGroupSize}</td>
                            <td>{tour.price}</td>
                            <td>
                                <Form.Check 
                                    type="switch"
                                    id={`featured-switch-${tour._id}`}
                                    checked={tour.featured}
                                    onChange={() => handleToggleFeatured(tour._id)}
                                />
                            </td>
                            <td>
                                <Link to={`/admin/update-tour/${tour._id}`}>
                                    <Button variant="warning" className="me-2">Update</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TourManagement;
