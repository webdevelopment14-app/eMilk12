import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PrintableDeliveryList from './PrintableDeliveryList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/DeliveryList.css';

const DeliveryList = ({ searchTerm, fetchDeliveries }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = user.firstname === 'Admin'
          ? await axios.get('/api/deliveries')
          : await axios.get(`/api/deliveries/milklistbyuserid?userId=${user.id}`);

        setDeliveries(response.data);
        setFilteredDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        toast.error('Failed to fetch deliveries.', { autoClose: 3000 });
      } finally {
        const minimumLoadingTime = 2000;
        const timeElapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumLoadingTime - timeElapsed);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    };

    const startTime = Date.now();
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredDeliveries(
      searchTerm
        ? deliveries.filter(delivery => delivery.deliveryDate.includes(searchTerm))
        : deliveries
    );
  }, [searchTerm, deliveries]);

  const deleteDelivery = async (id) => {
    try {
      await axios.delete(`/api/deliveries/${id}`);
      const updatedDeliveries = deliveries.filter(delivery => delivery.id !== id);
      setDeliveries(updatedDeliveries);
      setFilteredDeliveries(updatedDeliveries);
      fetchDeliveries?.();
      toast.success('Delivery deleted successfully!', { autoClose: 3000 });
    } catch (error) {
      console.error('Error deleting delivery:', error);
      toast.error('Failed to delete delivery.', { autoClose: 3000 });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('user');
    toast.dismiss();
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="delivery-list">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1>Deliveries</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity (L)</th>
            <th>Supplier</th>
            <th>User Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
              {[...Array(4)].map((_, index) => (
                <tr key={index}>
                  <td><Skeleton height={25} /></td>
                  <td><Skeleton height={25} /></td>
                  <td><Skeleton height={25} /></td>
                  <td><Skeleton height={25} /></td>
                  <td>
                    <Skeleton height={25} width={60} style={{ marginRight: '5px' }} />
                    <Skeleton height={25} width={60} style={{ marginRight: '5px' }} />
                    <Skeleton height={25} width={60} />
                  </td>
                </tr>
              ))}
            </SkeletonTheme>
          ) : (
            filteredDeliveries.length > 0 ? (
              filteredDeliveries.map(delivery => (
                <tr key={delivery.id}>
                  <td>{delivery.deliveryDate}</td>
                  <td>{delivery.quantity}</td>
                  <td>{delivery.supplier}</td>
                  <td>{delivery.user.id}</td>
                  <td className="actions">
                    <Link to={`/delivery/${delivery.id}`} className="details">Details</Link>
                    <Link to={`/edit-delivery/${delivery.id}`} className="edit">Edit</Link>
                    <button 
                      onClick={() => deleteDelivery(delivery.id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No deliveries found</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Link to="/add-delivery" className="add-button">Add New Delivery</Link>
      <ReactToPrint
        trigger={() => <button className="print-button">Print List</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <PrintableDeliveryList ref={componentRef} deliveries={filteredDeliveries} />
      </div>
    </div>
  );
};

export default DeliveryList;
