import React from 'react';
import {
  FooterContainer
} from '../styles/FooterStyles';
import logo from '../img/logo.png';

const Footer = () => {
  return (
    <FooterContainer>
      <img src={logo} alt="Logo Colegio" />
      <p>Todos los derechos reservados</p>
    </FooterContainer>
  );
};

export default Footer;
