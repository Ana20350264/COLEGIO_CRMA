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
import subtema5 from '../img/5.jpg'

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
        <SubtemaTitle>Subtema 5: Identificar detalles específicos en una conversación para hablar sobre hábitos de los medios.</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <em>Competencia a desarrollar: Identificar detalles específicos en una conversación para hablar sobre hábitos de los medios.</em>

          <p>
          Cuando oímos hablar de las cartas o “letters” tenemos la sensación de que hablamos de algo obsoleto. Si bien es cierto que el correo postal “postal mail” pertenece cada vez más al pasado, todavía existen situaciones en las que necesitamos comunicarnos a través de este método. Lo que está claro es que vivimos en la era de internet y las comunicaciones a través de la red parecen ser lo más habitual. Esta digitalización en el modo de comunicarnos también tiene un importante efecto sobre el idioma. Los términos que utilizamos para referirnos a esta área de vocabulario específico están cada vez más influenciados por el inglés, con la consecuencia de que cada vez usamos más anglicismos.
          </p>
        </SubtemaContent>

      <ImageSub src={subtema5} alt="Subtema 5" />

        <ActivitiesSection>
          <h3>Actividades:</h3>
          <ActivityButton><Link to="/oracion5">Completa la oración</Link></ActivityButton>
          <ActivityButton><Link to="/unir5">Conectar palabras</Link></ActivityButton>
          <ActivityButton><Link to="/crucigrama5">Crucigrama</Link></ActivityButton>
        </ActivitiesSection>

        <NavigationButtons>
          <button><Link to="/crucigrama4">Anterior</Link></button>
          <button><Link to="/oracion5">Siguiente</Link></button>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
