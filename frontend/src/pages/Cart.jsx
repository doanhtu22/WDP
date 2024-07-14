import { Link } from 'react-router-dom';
import CommonSection from '../shared/CommonSection';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, Row, Table } from 'reactstrap';
import { BASE_URL } from '../utils/config';

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const [tours, setTours] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sizePage, setSizePage] = useState(5);

    const fetchData = async () => {
        try {
            const res = await fetch(`${BASE_URL}/cart`, {
                credentials: 'include',
            });
            const data = await res.json();
            setCarts(data);
            const tourIDs = data.map((cart) => cart.id).flat();
            setTours(tourIDs);
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`${BASE_URL}/cart/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success("Service deleted successfully");
                fetchData();
            } else {
                toast.error("Failed to delete service");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const totalPages = Math.ceil(tours.length / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentTours = tours.slice(startIndex, endIndex);

    var startDateStrings = tours.map((t) => t.startDate);

    var formattedDates = startDateStrings.map((startDateString) => {
        var startDate = new Date(startDateString);
        var day = startDate.getDate();
        var month = startDate.getMonth() + 1;
        var year = startDate.getFullYear();
        return day + "/" + month + "/" + year;
    });

    const addToBill = async (id, price) => {
        const requestData = {
            id: _id,
            price: price,
        };
        try {
            const res = await fetch(`${BASE_URL}/booking/add`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            if (res.ok) {
                const data = await res.json();
                removeFromCart(id);
                toast.success(data.message);
                fetchData();
            } else if (res.status === 401) {
                const data = await res.json();
                toast.error(data.error);
            } else if (res.status === 403) {
                const data = await res.json();
                toast.error(data.message);
            } else {
                const data = await res.json();
                handleDelete(id);
                toast.error(data.error);
                fetchData();
            }
        } catch (error) {
            toast.error("Failed");
        }
    };
    const removeFromCart = async (id) => {
        console.log(id);
        const requestData = {
            id: _id,
        };
        try {
            const res = await fetch(`${BASE_URL}/cart/${id}`, {
                credentials: "include",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message);
            } else if (res.status === 401) {
                const data = await res.json();
                toast.error(data.error);
            } else if (res.status === 403) {
                const data = await res.json();
                toast.error(data.message);
            } else {
                const data = await res.json();
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Failed");
        }
    };

    return (
        <Container fluid>
            <Row style={{ justifyContent: "left !important" }} className="ml-3">
                <a
                    href="/"
                    style={{ textDecoration: "none", color: "black" }}
                    className="fa fa-home"
                >
                    <i className="bi bi-house"></i>Home
                </a>
                <i className="bi bi-chevron-compact-right"></i>
                <p>
                    <i className="bi bi-cart"></i>Cart
                </p>
            </Row>
            <Row className="ml-3">
                <h2>Shopping Cart</h2>
            </Row>
            <Row style={{ padding: "15px", backgroundColor: "#fff" }}>
                <Table className="table-striped table-bordered table-responsive mt-5">
                    <thead>
                        <tr>
                            <td className="col-md-1">Type</td>
                            <td className="col-md-4">Title</td>
                            <td className="col-md-3">Start date</td>
                            <td className="col-md-1">Slot</td>
                            <td className="col-md-1">Price</td>
                            <td className="col-md-1">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTours.map((t, index) => (
                            <tr key={t._id}>
                                <td>1</td>
                                <td>
                                    <Link to={"/detail/" + t._id}>{t.title}</Link>
                                </td>
                                <td>{formattedDates[index]}</td>
                                <td>{t.slot}</td>
                                <td>{t.price}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        style={{
                                            width: "80px",
                                            fontSize: "14px",
                                            padding: "2px",
                                        }}
                                        onClick={() => removeFromCart(t._id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={(e) => addToBill(t._id, t.price)}
                                        style={{
                                            width: "80px",
                                            fontSize: "14px",
                                            padding: "2px",
                                        }}
                                    >
                                        Book now
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" className="text-center">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            currentPage === index + 1
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        className="mx-1"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Row>
        </Container>
    );
}

export default Cart;