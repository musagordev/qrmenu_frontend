import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function PrivateRoute ({ children, ...rest }) {
    const auth = useContext(AuthContext);

    return auth.token ? (children) : (<Navigate to="/login"/>)
                }

export default PrivateRoute;