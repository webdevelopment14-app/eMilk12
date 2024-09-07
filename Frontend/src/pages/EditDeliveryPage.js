import React, { useEffect, useState } from 'react';
import DeliveryForm from '../components/DeliveryForm';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/PageLayout.css';

const EditDeliveryPage = () => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/deliveries/${id}`)
      .then(response => setDelivery(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleSave = (updatedDelivery) => {
    axios.put(`/api/deliveries/${id}`, updatedDelivery)
      .then(() => navigate('/deliveries'))
      .catch(error => console.error(error));
  };

  return (
    <div className="page-layout">
      <h2>Edit Delivery</h2>
      {delivery && <DeliveryForm onSubmit={handleSave} initialData={delivery} />}
    </div>
  );
};

export default EditDeliveryPage;
