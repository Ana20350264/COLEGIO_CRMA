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
import subtema4 from '../img/4.jpg'
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
        <SubtemaTitle>Subtema 4: Preguntar y responder sobre hábitos y rutinas: Presente simple: preguntas y respuestas.</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <em>Competencia a desarrollar: Preguntar y responder sobre hábitos y rutinas: Presente simple: preguntas y respuestas.</em>
          <p>
          En inglés, el simple present es el tiempo presente, forma parte del vocabulario que te permite describir las acciones que ocurren en el momento en que estás hablando o que son parte de tu rutina diaria. Dentro de este tiempo verbal también se encuentran las actividades que pueden programarse, así como las situaciones permanentes que no son cuestionables. El simple present debe de usarse para hablar de “hábitos, frecuencias o acciones repetidas, y de cosas que no cambian o que son generalmente verdades”, por ejemplo, el país o ciudad donde vive una persona.
          </p>
          <p>
          Debes de considerar que el simple present puede emplearse en oraciones que no solo afirmen ciertas acciones, también en aquellas que niegan algún suceso. Para saber cuándo y cómo es correcto usar este tiempo verbal, lo primero con lo que tienes que familiarizarte son sus reglas gramaticales.
          </p>
        </SubtemaContent>

      <ImageSub src={subtema4} alt="Subtema 4" />

        <ActivitiesSection>
          <h3>Actividades:</h3>
          <Link to="/oracion4"><ActivityButton>Completa la oración</ActivityButton></Link>
          <Link to="/unir4"><ActivityButton>Conectar palabras</ActivityButton></Link>
          <Link to="/crucigrama4"><ActivityButton>Crucigrama</ActivityButton></Link>
        </ActivitiesSection>

        <NavigationButtons>
          <Link to="/crucigrama3"><button>Anterior</button></Link>
          <Link to="/oracion4"><button>Siguiente</button></Link>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
