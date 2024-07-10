import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/config';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await BASE_URL.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            {/* Add edit and delete options */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
