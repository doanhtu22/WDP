import { useEffect, useState } from "react";
import TableBooking from "../../components/TableBooking/table";
import BookingModal from "../../components/BookingModal";
import { Button } from "react-bootstrap";

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        userEmail: "",
        tourName: "",
        fullName: "",
        guestSize: 0,
        phone: "",
        bookAt: "",
    });
    const [editingBooking, setEditingBooking] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("accessToken");

        try {
            const url = editingBooking
                ? `http://localhost:8000/api/v1/booking/${editingBooking._id}`
                : "http://localhost:8000/api/v1/booking";
            const method = editingBooking ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (editingBooking) {
                setBookings(
                    bookings.map((booking) =>
                        booking._id === editingBooking._id ? result.data : booking
                    )
                );
            } else {
                setBookings([...bookings, result.data]);
            }

            setFormData({
                userId: "",
                userEmail: "",
                tourName: "",
                fullName: "",
                guestSize: 0,
                phone: "",
                bookAt: "",
            });
            setEditingBooking(null);
            setShowModal(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleEdit = (booking) => {
        setFormData(booking);
        setEditingBooking(booking);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("accessToken");
        try {
            await fetch(`http://localhost:8000/api/v1/booking/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(bookings.filter((booking) => booking._id !== id));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                const response = await fetch("http://localhost:8000/api/v1/booking", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setBookings(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="tours-container">
            <h2>Bookings Management</h2>
            <TableBooking
                data={bookings}
          
                handleDelete={handleDelete}
            />
            <BookingModal
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setEditingBooking(null);
                    setFormData({
                        userId: "",
                        userEmail: "",
                        tourName: "",
                        fullName: "",
                        guestSize: 0,
                        phone: "",
                        bookAt: "",
                    });
                }}
                handleSubmit={handleSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
                editingBooking={editingBooking}
            />
        </div>
    );
}

export default BookingManagement;
