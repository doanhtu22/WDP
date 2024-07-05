import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/tour.css';
import TourCard from './../shared/TourCard';
import SearchBar from './../shared/SearchBar';
import { Col, Container, Row } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours`);
        const data = await response.json();
        setTours(data);
        setPageCount(Math.ceil(data.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handlePageClick = (number) => {
    setPage(number);
    window.scrollTo(0, 0);
  };

  const displayedTours = tours.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <>
      <CommonSection title={"All Tours Available"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {
            !loading && !error &&
            <Row>
              {
                displayedTours.map(tour => (
                  <Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))
              }

              <Col lg='12'>
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map(number => (
                    <span key={number} onClick={() => handlePageClick(number)}
                      className={page === number ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          }
        </Container>
      </section>
    </>
  );
}

export default Tours;
