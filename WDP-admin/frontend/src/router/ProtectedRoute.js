import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
    const { user } = useContext(AuthContext);
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        if (!user) {
            const localUser = localStorage.getItem('user');
            if (localUser) {
                setStoredUser(JSON.parse(localUser));
            }
        }
    }, [user]);

    const currentUser = user || storedUser;
    console.log("Current user in ProtectedRoute:", currentUser);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && (!currentUser.role || currentUser.role !== requiredRole)) {
        console.log('User role:', currentUser.role, 'Required role:', requiredRole);
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
