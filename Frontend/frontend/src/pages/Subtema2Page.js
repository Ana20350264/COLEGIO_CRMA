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
import subtema2 from '../img/habito.jpg'

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
        <SubtemaTitle>Subtema 2: Usar el presente simple para hablar sobre hábitos y rutinas: afirmativo y negativo, adverbios de frecuencia.</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <em>Competencia a desarrollar: Usar el presente simple para hablar sobre hábitos y rutinas: afirmativo y negativo, adverbios de frecuencia.</em>
          <p>
          También se puede usar el presente simple para hablar de nuestros hábitos, igualmente porque son cosas que no cambian.
          </p>
          <p>Para aportar más información sobre las rutinas podemos añadir adverbios de frecuencia, como always, sometimes, hardly ever, never (siempre, a veces, casi nunca, nunca), con el fin de indicar con qué frecuencia hacemos algo.</p>
          <p>La estructura del presente simple es… increíblemente simple. En inglés la forma verbal es siempre la misma, salvo para la tercera persona del singular, en la que tienes que añadir una “s”. Así, el presente simple del verbo “comer” (“Yo como, tú comes, él come…”)</p>
        </SubtemaContent>

        <ImageSub src={subtema2} alt="Subtema 2" />

        <ActivitiesSection>
          <h3>Actividades:</h3>
          <ActivityButton><Link to="/oracion2">Completa la oración</Link></ActivityButton>
          <ActivityButton><Link to="/unir2">Conectar palabras</Link></ActivityButton>
          <ActivityButton><Link to="/crucigrama2">Crucigrama</Link></ActivityButton>
        </ActivitiesSection>

        <NavigationButtons>
          <button><Link to="/crucigrama1">Anterior</Link></button>
          <button><Link to="/oracion2">Siguiente</Link></button>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
