import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; 
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/DeliveryForm.css';

const DeliveryForm = ({ onSuccess }) => {
  const [delivery, setDelivery] = useState({ deliveryDate: '', quantity: '', supplier: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchDelivery = async () => {
        try {
          const response = await axios.get(`/api/deliveries/${id}`);
          setDelivery(response.data);
        } catch (error) {
          console.error('Failed to fetch delivery details:', error);
        }
      };

      fetchDelivery();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDelivery({ ...delivery, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const deliveryData = {
      ...delivery,
      user: { id: user.id }
    };

    try {
      if (id) {
        await axios.put(`/api/deliveries/${id}`, deliveryData);
   
      } else {
        await axios.post('/api/deliveries', deliveryData);
       
      }
      if (onSuccess) onSuccess(id ? 'update' : 'add');
      navigate('/deliveries');
    } catch (error) {
      console.error('Failed to save delivery:', error);
      toast.error('Failed to save delivery.'); 
    }
  };

  return (
    <div className="delivery-form">
      <h1>{id ? 'Edit Delivery' : 'Add Deliveries Here'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Delivery Date:
          <input
            type="date"
            name="deliveryDate"
            value={delivery.deliveryDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={delivery.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Supplier:
          <input
            type="text"
            name="supplier"
            value={delivery.supplier}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DeliveryForm;
