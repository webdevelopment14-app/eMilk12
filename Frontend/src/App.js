import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DeliveryList from './components/DeliveryList';
import DeliveryForm from './components/DeliveryForm';
import DeliveryDetail from './components/DeliveryDetail';
import BillSummary from './components/BillSummary';
import FeaturesPage from './components/FeaturesPage';
import axios from 'axios';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Registration from './components/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';

axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalMilk, setTotalMilk] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [minLoadingTime, setMinLoadingTime] = useState(0);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/deliveries');
      const data = response.data;
      setDeliveries(data);
      calculateTotals(data);
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
      toast.error('Failed to fetch deliveries.', { autoClose: 1000 });
    }
  };

  const calculateTotals = (deliveries) => {
    let totalMilk = 0;
    let totalBill = 0;
    const MILK_COST_PER_LITER = 160.0;

    deliveries.forEach((delivery) => {
      if (delivery.quantity) {
        totalMilk += delivery.quantity;
        totalBill += delivery.quantity * MILK_COST_PER_LITER;
      }
    });

    setTotalMilk(totalMilk);
    setTotalBill(totalBill);
  };

  const simulateMinLoadingTime = async () => {
    const minTime = 3000; // Minimum loader display time in ms (1 minute)
    setMinLoadingTime(Date.now() + minTime);
    return new Promise(resolve => setTimeout(resolve, minTime));
  };

  useEffect(() => {
    const fetchAndSetLoader = async () => {
      await simulateMinLoadingTime();
      await fetchDeliveries();
      setLoading(false);
    };

    fetchAndSetLoader();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('authenticated');
      setIsAuthenticated(auth === 'true');
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleFormSuccess = (action) => {
    return () => {
      if (action === 'add') {
        toast.success('Delivery added successfully!', { autoClose: 1000 });
      } else if (action === 'update') {
        toast.success('Delivery updated successfully!', { autoClose: 1000 });
      } else if (action === 'delete') {
        toast.success('Delivery deleted successfully!', { autoClose: 1000 });
      }
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
    toast.info('Logged out successfully!', { autoClose: 300 });
  };

  if (loading || Date.now() < minLoadingTime) {
    return <Loader />;
  }

  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar onSearch={handleSearch} />}
        <Routes>
          <Route exact path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/landing-page"
            element={
              <ProtectedRoute
                element={<LandingPage onLogout={handleLogout} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/deliveries"
            element={
              <ProtectedRoute
                element={<DeliveryList searchTerm={searchTerm} fetchDeliveries={fetchDeliveries} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/add-delivery"
            element={
              <ProtectedRoute
                element={<DeliveryForm onSuccess={handleFormSuccess('add')} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/edit-delivery/:id"
            element={
              <ProtectedRoute
                element={<DeliveryForm onSuccess={handleFormSuccess('update')} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/delivery/:id"
            element={
              <ProtectedRoute
                element={<DeliveryDetail />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/bill-summary"
            element={
              <ProtectedRoute
                element={<BillSummary />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/landing-page" : "/"} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
