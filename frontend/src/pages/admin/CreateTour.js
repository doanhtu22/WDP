import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function CreateTour() {
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: '',
        desc: '',
        price: '',
        maxGroupSize: '',
        itinerary: [{ day: 1, detail: '' }]
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch("http://localhost:8000/api/v1/tours", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            navigate('/tours');
        } catch (error) {
            console.error("Error creating tour:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItineraryChange = (index, e) => {
        const { name, value } = e.target;
        const newItinerary = formData.itinerary.map((item, i) => {
            if (i === index) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setFormData({ ...formData, itinerary: newItinerary });
    };

    const addItineraryItem = () => {
        setFormData({
            ...formData,
            itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, detail: '' }]
        });
    };

    const removeItineraryItem = (index) => {
        setFormData({
            ...formData,
            itinerary: formData.itinerary.filter((_, i) => i !== index)
        });
    };

    return (
        <div>
            <h2>Create Tour</h2>
            <Form onSubmit={handleSubmit}>
                {/* Existing form fields */}
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDistance">
                    <Form.Label>Distance</Form.Label>
                    <Form.Control
                        type="number"
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoto">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control
                        type="text"
                        name="photo"
                        value={formData.photo}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="desc"
                        value={formData.desc}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMaxGroupSize">
                    <Form.Label>Max Group Size</Form.Label>
                    <Form.Control
                        type="number"
                        name="maxGroupSize"
                        value={formData.maxGroupSize}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Itinerary fields */}
                <h3>Itinerary</h3>
                {formData.itinerary.map((item, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group controlId={`formItineraryDay${index}`}>
                            <Form.Label>Day {index + 1}</Form.Label>
                            <Form.Control
                                type="number"
                                name="day"
                                value={item.day}
                                onChange={(e) => handleItineraryChange(index, e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId={`formItineraryDetail${index}`}>
                            <Form.Label>Detail</Form.Label>
                            <Form.Control
                                type="text"
                                name="detail"
                                value={item.detail}
                                onChange={(e) => handleItineraryChange(index, e)}
                                required
                            />
                        </Form.Group>
                        <Button variant="danger" onClick={() => removeItineraryItem(index)}>Remove</Button>
                    </div>
                ))}
                <Button variant="secondary" onClick={addItineraryItem}>Add Itinerary Item</Button>

                <Button variant="primary" type="submit" className="mt-3">Create Tour</Button>
            </Form>
        </div>
    );
}

export default CreateTour;
