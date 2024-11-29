import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  HomeContainer,
  SubtemaContainer,
  SubtemaTitle,
  SubtemaContent,
  ActivitiesSection,
  ActivityButton,
  NavigationButtons,
  ImageSub
} from '../styles/Subtema'; // Importa todos los estilos necesarios
import subtema3 from '../img/epoca.jpg'
import BASE_URL from '../config/apiConfig';


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
        <SubtemaTitle>Subtema 3: Encontrar detalles específicos en un artículo y hablar sobre grupos de épocas.</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <em>Competencia a desarrollar: Encontrar detalles específicos en un artículo y hablar sobre grupos de épocas.</em>
          <p>
          La práctica de lectura es una excelente manera de aprender vocabulario nuevo e incluso puedes mejorar tu gramática leyendo. Leer textos en inglés te ayudará a mejorar tu vocabulario en contexto, revisar estructuras gramaticales complejas en contexto y aumentar tu conocimiento de expresiones gramaticales en un nuevo idioma.
          </p>
          <p>Es importante leer textos en inglés con frecuencia para mejorar tu nivel. De esta forma, ayudarás a que tu cerebro sea más ágil y rápido a la hora de procesar la lectura en inglés en todos los campos y materias.</p>
        </SubtemaContent>

        <ImageSub src={subtema3} alt="Subtema 3" /> 

        <ActivitiesSection>
          <h3>Actividades:</h3>
          <Link to="/oracion3"><ActivityButton>Completa la oración</ActivityButton></Link>
          <Link to="/unir3"><ActivityButton>Conectar palabras</ActivityButton></Link>
          <Link to="/crucigrama3"><ActivityButton>Crucigrama</ActivityButton></Link>
        </ActivitiesSection>

        <NavigationButtons>
          <Link to="/crucigrama2"><button>Anterior</button></Link>
          <Link to="/oracion3"><button>Siguiente</button></Link>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
