import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Obtener el token del localStorage

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" />;
  }

  // Si hay token, permite el acceso a la ruta
  return children;
};

export default PrivateRoute;

