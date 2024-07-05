import React, { useEffect, useState } from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';
import useFetch from './../../hooks/useFetch';
import { BASE_URL } from './../../utils/config';

const FeaturedTourList = () => {
  const { data: allTours, loading, error } = useFetch(`${BASE_URL}/tours`);
  const [featuredTours, setFeaturedTours] = useState([]);

  useEffect(() => {
    console.log('Fetched all tours:', allTours);
    if (allTours && allTours.length > 0) {
      // Shuffle the array and take the first 4 elements
      const shuffledTours = allTours.sort(() => 0.5 - Math.random()).slice(0, 4);
      console.log('Shuffled tours:', shuffledTours);
      setFeaturedTours(shuffledTours);
    }
  }, [allTours]);

  return (
    <>
      {loading && <h4>Loading.....</h4>}
      {error && <h4>{error}</h4>}
      {
        !loading && !error && featuredTours.length > 0 &&
        featuredTours.map(tour => (
          <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))
      }
      {
        !loading && !error && featuredTours.length === 0 &&
        <h4>No tours available</h4>
      }
    </>
  );
}

export default FeaturedTourList;
