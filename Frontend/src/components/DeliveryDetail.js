import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 
import '../styles/DeliveryDetail.css'; 

const DeliveryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await axios.get(`/api/deliveries/${id}`);
        setDelivery(response.data);
      } catch (error) {
        console.error('Failed to fetch delivery details', error);
      }
    };

    fetchDelivery();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await axios.delete(`/api/deliveries/${id}`);
        navigate('/deliveries'); 
      } catch (error) {
        console.error('Failed to delete delivery', error);
      }
    }
  };

  if (!delivery) return <p>Loading...</p>;

  return (
    <div className="delivery-detail">
      <h1>Delivery Details</h1>
      <div className="detail-item">
        <label>ID</label>
        <span>{delivery.id}</span>
      </div>
      <div className="detail-item">
        <label>Delivery Date</label>
        <span>{delivery.deliveryDate}</span>
      </div>
      <div className="detail-item">
        <label>Quantity</label>
        <span>{delivery.quantity}</span>
      </div>
      <div className="detail-item">
        <label>Supplier</label>
        <span>{delivery.supplier}</span>
      </div>
      <div className="actions">
        <a href={`/edit-delivery/${delivery.id}`} className="edit">Edit</a>
        <button onClick={handleDelete} className="delete">Delete</button>
        <a href="/deliveries" className="back">Back</a>
      </div>
    </div>
  );
};

export default DeliveryDetail;
