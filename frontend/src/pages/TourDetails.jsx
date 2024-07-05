import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  // fetch data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const { 
    title, 
    description, 
    price, 
    feedback = [], 
    city, 
    image = [], 
    code_tour, 
    time, 
    vehicle, 
    quantityMax, 
    quantityMin, 
    timeSuggest, 
    user_suggest 
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(feedback);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      alert('Please sign in');
      return;
    }

    const reviewObj = {
      user: user._id,
      content: reviewText,
      rate: tourRating,
    };

    try {
      const res = await fetch(`${BASE_URL}/feedback/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <section>
      <Container>
        {loading && <h4 className='text-center pt-5'>LOADING.........</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
        {!loading && !error && tour && (
          <Row>
            <Col lg='8'>
              <div className="tour__content">
                {image.length > 0 ? (
                  <img src={image[0]?.url} alt={image[0]?.caption || 'Tour Image'} />
                ) : (
                  <p>No image available</p>
                )}

                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className='ri-star-fill' style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating || 'Not rated'}
                      {avgRating !== 0 && <span>({feedback.length})</span>}
                    </span>
                    <span><i className='ri-map-pin-fill'></i> {city}</span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className='ri-calendar-event-line'></i> {time}</span>
                    <span><i className='ri-vehicle-fill'></i> {vehicle}</span>
                    <span><i className='ri-user-line'></i> Max: {quantityMax}</span>
                    <span><i className='ri-user-line'></i> Min: {quantityMin}</span>
                    <span><i className='ri-time-line'></i> {timeSuggest}</span>
                    <span><i className='ri-user-suggest-line'></i> {user_suggest}</span>
                    <span><i className='ri-money-dollar-circle-line'></i> ${price}/ per person</span>
                  </div>
                  <h5>Description</h5>
                  <p>{description}</p>
                </div>

                {/* ============ TOUR REVIEWS SECTION START ============ */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({feedback.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[...Array(5)].map((_, index) => (
                        <span key={index + 1} onClick={() => setTourRating(index + 1)}>
                          {index + 1} <i className='ri-star-s-fill'></i>
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder='Share your thoughts' required />
                      <button className='btn primary__btn text-white' type='submit'>
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className='user__reviews'>
                    {feedback.map(review => (
                      <div className="review__item" key={review._id}>
                        <img src={avatar} alt="Avatar" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.user.username}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                            </div>

                            <span className='d-flex align-items-center'>
                              {review.rate} <i className='ri-star-s-fill'></i>
                            </span>
                          </div>

                          <h6>{review.content}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/* ============ TOUR REVIEWS SECTION END ============== */}
              </div>
            </Col>

            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default TourDetails;
