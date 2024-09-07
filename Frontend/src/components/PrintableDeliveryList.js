import React from 'react';

const PrintableDeliveryList = React.forwardRef(({ deliveries }, ref) => (
  <div ref={ref} style={{ color: 'purple', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h1 style={{ textAlign: 'center' }}>Delivery List</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid purple' }}>
          <th style={{ padding: '10px', textAlign: 'left' }}>Date (dd/mm/yy)</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Supplier</th>
        </tr>
      </thead>
      <tbody>
        {deliveries.map(delivery => (
          <tr key={delivery.id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px' }}>{delivery.deliveryDate}</td>
            <td style={{ padding: '8px' }}>{delivery.quantity}</td>
            <td style={{ padding: '8px' }}>{delivery.supplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  </div>
  
));

export default PrintableDeliveryList;
