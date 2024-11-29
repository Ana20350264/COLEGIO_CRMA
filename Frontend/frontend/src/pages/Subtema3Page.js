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

function HomePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');  // Obtenemos el token del localStorage

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch('http://localhost:3001/home', {
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
          <ActivityButton><Link to="/oracion3">Completa la oración</Link></ActivityButton>
          <ActivityButton><Link to="/unir3">Conectar palabras</Link></ActivityButton>
          <ActivityButton><Link to="/crucigrama3">Crucigrama</Link></ActivityButton>
        </ActivitiesSection>

        <NavigationButtons>
          <button><Link to="/crucigrama2">Anterior</Link></button>
          <button><Link to="/oracion3">Siguiente</Link></button>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
