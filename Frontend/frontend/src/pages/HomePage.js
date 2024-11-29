import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {HomeContainer,HeaderSection,SubtemaCardsContainer,Card,Quote,Banners,CardTitle,CardImage
} from '../styles/HomePageStyles'; // Importa los estilos específicos

import banderitas from '../img/banderitas5.png'
import tema1 from '../img/tema1.jpg'
import tema2 from '../img/tema2.png'
import tema3 from '../img/tema3.png'
import tema4 from '../img/tema4.png'
import tema5 from '../img/tema5.png'
import tema6 from '../img/tema6.jpg'
import { Link } from 'react-router-dom';
import BASE_URL from '../config/apiConfig';


function HomePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');  // Obtenemos el token del localStorage

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch(`${BASE_URL}/home`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setData(result);
    };

    fetchProtectedData();
  }, [token]);

  return (
    <HomeContainer>
      <Navbar /> {/* Incluimos el Navbar */}

      <HeaderSection>
        {/* Decoración superior */}
        <Banners>
          <img src={banderitas} alt="Decoración" />
        </Banners>

        {/* Frase inspiradora */}
        <Quote>
          <p>"Eduquen a los niños y no será necesario castigar a los hombres."</p>
          <span>— Pitágoras</span>
        </Quote>
      </HeaderSection>

      <SubtemaCardsContainer>
        {/* Subtemas con enlaces */}
        <Card>
          <Link to="/subtema1">
          <CardImage src={tema1} alt="Subtema 1" />
          <CardTitle>Subtema 1: Hablar sobre actividades culturales, gustos y no gustos.</CardTitle>
          </Link>
        </Card>

        <Card>
        <Link to="/subtema2">  
          <CardImage src={tema2} alt="Subtema 2" />
          <CardTitle>Subtema 2: Usar el presente simple para hablar sobre hábitos y rutinas...</CardTitle>
        </Link>  
        </Card>

        <Card>
          <Link to="/subtema3">
          <CardImage src={tema3} alt="Subtema 3" />
          <CardTitle>Subtema 3: Encontrar detalles específicos en un artículo...</CardTitle>
          </Link>
        </Card>

        <Card>
        <Link to="/subtema4">  
          <CardImage src={tema4} alt="Subtema 4" />
          <CardTitle>Subtema 4: Preguntar y responder sobre hábitos y rutinas...</CardTitle>
        </Link>  
        </Card>

        <Card>
        <Link to="/subtema5">
          <CardImage src={tema5} alt="Subtema 5" />
          <CardTitle>Subtema 5: Identificar detalles específicos en una conversación...</CardTitle>
        </Link>
        </Card>

        <Card>
          <Link to="/subtema6">
          <CardImage src={tema6} alt="Subtema 6" />
          <CardTitle>Subtema 6: Compra boletos en un cinema.</CardTitle>
          </Link>
        </Card>
      </SubtemaCardsContainer>

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
