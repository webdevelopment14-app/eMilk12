import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            axios.delete(`/api/users/${userId}`)
                .then(response => {
                    alert('User and associated deliveries deleted successfully');
             
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch(error => {
                    console.error('There was an error deleting the user!', error);
                });
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
