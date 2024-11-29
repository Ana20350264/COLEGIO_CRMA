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

  // Decodificamos el token solo si existe
  if (token) {
    const decodedToken = jwtDecode(token);
    {/*console.log('Decoded Token:', decodedToken);*/}
    nombre = decodedToken.nombre || 'Nombre'; // Tomamos solo el nombre
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redireccionar a la página de inicio de sesión
  };

  return (
    <NavbarContainer>
      <Logo src={logo} alt="Logo Colegio" />

      <NavLinks>
        <a href="/home">Inicio</a>
        <a href="/subtema1">Subtema 1</a>
        <a href="/subtema2">Subtema 2</a>
        <a href="/subtema3">Subtema 3</a>
        <a href="/subtema4">Subtema 4</a>
        <a href="/subtema5">Subtema 5</a>
        <a href="/subtema6">Subtema 6</a>
        <a href="/sobreescuela">Sobre la escuela</a>
      </NavLinks>

      <UserSection>
        <Icono src={icono} alt="Icono Usuario"/>
        <span>{nombre}</span> {/* Mostramos solo el nombre */}
        <NavButton onClick={handleLogout}>Cerrar Sesión</NavButton>
      </UserSection>
    </NavbarContainer>
  );
}

export default Navbar;
