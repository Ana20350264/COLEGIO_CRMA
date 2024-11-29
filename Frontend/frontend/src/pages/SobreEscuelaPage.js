import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  HomeContainer,
  SubtemaContainer,
  SubtemaTitle,
  SubtemaContent,
  NavigationButtons
} from '../styles/Subtema'; // Importa todos los estilos necesarios
import BASE_URL from '../config/apiConfig';
{/*import subtema2 from '../img/habito.jpg' */}

function HomePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');  // Obtenemos el token del localStorage

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch(`${BASE_URL}/home`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Enviamos el token en la cabecera Authorization
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      setData(result);
    };

    fetchProtectedData();
  }, [token]);

  return (
    <HomeContainer>
      <Navbar /> {/* Incluimos el Navbar */}

      <SubtemaContainer>
      <SubtemaTitle>SOBRE LA ESCUELA</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <h2>Misión</h2>
          <p>
          Proporcionar calidad y calidez en el servicio educativo de nivel básico para formar individuos preparados para triunfar en el ámbito educativo y social a través de una educación transversal sustentada en valores y la filosofía del sabio griego Pitágoras: “Educadlos cuando niños, para que de grandes no haya necesidad de castigarlos”.  
          </p>
          <h2>Visión</h2>
          <p>
          Ser la mejor opción en Tuxtepec y la región dentro del nivel educativo básico y al mismo tiempo estar a la vanguardia en los cambios y adelantos pedagógicos y tecnológicos para enriquecer la calidad de nuestra enseñanza.
          </p>
          <h2>Objetivo</h2>
          <p>
          El objetivo principal de los servicios que se ofrecen es promover el desarrollo integral del educando como ser individual, social y colectivo para que emplee en forma óptima sus capacidades y adquiera la formación que le permita continuar con éxito sus estudios.
          </p>
        </SubtemaContent>

        <NavigationButtons>
          <Link to="/home"><button>Inicio</button></Link>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;