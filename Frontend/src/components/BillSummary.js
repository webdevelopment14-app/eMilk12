import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import '../styles/BillSummary.css';

const BillSummary = () => {
    const [totalMilk, setTotalMilk] = useState(0);
    const [displayedMilk, setDisplayedMilk] = useState(0);
    const [totalBill, setTotalBill] = useState(0);
    const [displayedBill, setDisplayedBill] = useState(0);

    const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage or another appropriate source
    const userId = user?.id;
    const isAdmin = user?.firstname === 'Admin';

    useEffect(() => {
        if (userId) {
            if (isAdmin) {
                // Admin fetches total milk and total bill for all users
                axios.get('/api/deliveries/totalMilk')
                    .then(response => {
                        const targetMilk = response.data;
                        setTotalMilk(targetMilk);
                        animateMilk(targetMilk);
                    })
                    .catch(error => console.error('Error fetching total milk for all users:', error));

                axios.get('/api/deliveries/totalBill')
                    .then(response => {
                        const targetBill = response.data;
                        setTotalBill(targetBill);
                        animateBill(targetBill);
                    })
                    .catch(error => console.error('Error fetching total bill for all users:', error));
            } else {
                // Regular user fetches their own total milk and total bill
                axios.get('/api/deliveries/totalMilk', { params: { userId } })
                    .then(response => {
                        const targetMilk = response.data;
                        setTotalMilk(targetMilk);
                        animateMilk(targetMilk);
                    })
                    .catch(error => console.error('Error fetching total milk:', error));

                axios.get('/api/deliveries/totalBill', { params: { userId } })
                    .then(response => {
                        const targetBill = response.data;
                        setTotalBill(targetBill);
                        animateBill(targetBill);
                    })
                    .catch(error => console.error('Error fetching total bill:', error));
            }
        }
    }, [userId, isAdmin]);

    const animateMilk = (targetMilk) => {
        let currentMilk = 0;
        const interval = setInterval(() => {
            setDisplayedMilk(currentMilk);
            if (currentMilk >= targetMilk) {
                clearInterval(interval);
            } else {
                currentMilk += 1;
            }
        }, 125);
    };

    const animateBill = (targetBill) => {
        let currentBill = 0;
        const interval = setInterval(() => {
            setDisplayedBill(currentBill);
            if (currentBill >= targetBill) {
                clearInterval(interval);
            } else {
                const increment = Math.max(1, Math.floor(targetBill / 100));
                currentBill += increment;
            }
        }, 15);
    };

    const printBill = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Bill Summary</title></head><body>');
        printWindow.document.write('<h2>Bill Summary</h2>');
        printWindow.document.write('<p>Total Milk Delivered: ' + totalMilk + ' liters</p>');
        printWindow.document.write('<p>Total Bill: PKR ' + totalBill + '</p>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className="bill-summary">
            <h2>Payment Details</h2>
            <div className="summary-section">
                <div className="summary-item">
                    <div className="summary-icon">
                        <img src="mac.png" alt="Invoice Icon" className="circle-image"/>
                    </div>
                    <div className="summary-content">
                        <p>Total Milk Delivered</p>
                        <span>{displayedMilk} liters</span>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-icon">
                        <img src="das.PNG" alt="Terms Icon" className="circle-image"/>
                    </div>
                    <div className="summary-content">
                        <p>Terms & Conditions</p>
                        <span>Please check the terms</span>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-icon">
                        <img src="logo.PNG" alt="Bank Icon" className="circle-image"/>
                    </div>
                    <div className="summary-content">
                        <p>Total Bill</p>
                        <span>{displayedBill} PKR</span>
                    </div>
                </div>
            </div>
            <button onClick={printBill}>Print Bill</button>
        </div>
    );
};

export default BillSummary;
