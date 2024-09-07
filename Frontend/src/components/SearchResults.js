import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchResults = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchDeliveries = async () => {
      const queryParams = new URLSearchParams(location.search);
      const date = queryParams.get('date');

      try {
        const response = await axios.get(`/api/deliveries?date=${encodeURIComponent(date)}`);
        setDeliveries(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch deliveries.');
        setLoading(false);
        toast.error('Failed to fetch deliveries.');
      }
    };

    fetchDeliveries();
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Search Results</h1>
      {deliveries.length === 0 ? (
        <p>No deliveries found for the specified date.</p>
      ) : (
        <ul>
          {deliveries.map(delivery => (
            <li key={delivery.id}>
              <h2>{delivery.date}</h2>
              <p>Quantity: {delivery.quantity}</p>
              <p>Price: {delivery.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
