import React, { useState } from 'react';

const DeliveryForm = ({ onSubmit }) => {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDelivery = {
      deliveryDate,
      quantity: parseFloat(quantity), 
      supplier,
    };

    onSubmit(newDelivery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantity (L):</label>
        <input
          type="number"
          step="0.01" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Supplier:</label>
        <input
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default DeliveryForm;
