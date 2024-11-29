import React from 'react';
import {
  NavbarContainer,
  Logo,
  NavLinks,
  UserSection,
  NavButton,
  Icono
} from '../styles/NavbarStyles';
import logo from '../img/logo.png';
import icono from '../img/icono.png';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const token = localStorage.getItem('token');
  let nombre = '';

  // Decodificamos el token si existe
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
      nombre = decodedToken.nombre || 'Nombre';
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirigir a la página de inicio de sesión
  };

  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo src={logo} alt="Logo Colegio" />

      {/* Sección del usuario */}
      <UserSection>
        <Icono src={icono} alt="Icono Usuario" />
        <span>{nombre}</span>
        <NavButton onClick={handleLogout}>Cerrar Sesión</NavButton>
      </UserSection>
    </NavbarContainer>
  );
}

export default Navbar;
