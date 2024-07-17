import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const BookingModal = ({
    show,
    handleClose,
    handleSubmit,
    formData,
    handleInputChange,
    editingBooking,
}) => {
    // Helper function to format the date in Vietnam timezone
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const offset = d.getTimezoneOffset() * 60000;
        const vietnamTime = new Date(d.getTime() - offset + 7 * 3600000);
        return vietnamTime.toISOString().slice(0, -8);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editingBooking ? "Edit Booking" : "Create Booking"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTourName">
                        <Form.Label>Tour Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="tourName"
                            placeholder="Tour Name"
                            value={formData.tourName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGuestSize">
                        <Form.Label>Guest Size</Form.Label>
                        <Form.Control
                            type="number"
                            name="guestSize"
                            placeholder="Guest Size"
                            value={formData.guestSize}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBookAt">
                        <Form.Label>Booking Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="bookAt"
                            value={formatDate(formData.bookAt)}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        {editingBooking ? "Update" : "Create"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookingModal;
