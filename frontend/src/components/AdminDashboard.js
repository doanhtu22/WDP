import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/content">Content Management</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
        {/* Add more links for other functionalities */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
