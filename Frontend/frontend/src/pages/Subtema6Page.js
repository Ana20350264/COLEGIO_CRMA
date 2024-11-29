import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  HomeContainer,
  SubtemaContainer,
  SubtemaTitle,
  SubtemaContent,
  SubtemaList2,
  ActivitiesSection,
  ActivityButton,
  NavigationButtons
} from '../styles/Subtema'; // Importa todos los estilos necesarios
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
        <SubtemaTitle>Subtema 6: Compra boletos en un cinema. </SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <em>Competencia a desarrollar: Aprender un diálogo para comprar boletos en un cinema.</em>
          <p>
          Cuando se trata de ir al cine, comprar entradas suele ser el primer paso del proceso. Ya sea que esté viendo el último éxito de taquilla o una película independiente, saber cómo comprar boletos en el cine puede ahorrarle tiempo y molestias. Desde navegar por las diferentes opciones de boletos hasta comprender los precios, hay algunas cosas clave que se deben tener en cuenta al comprar boletos para el cine.
          </p>
          <p>
          En este tema, exploraremos el vocabulario de de la compra de entradas para el cine, incluidas las frases y el vocabulario comunes que puede encontrar en la taquilla.
          </p>
          <p>Aquí te va una conversación básica respecto a la compra de boletos:</p>
          <SubtemaList2>
            <li><b>Person 1:</b> Hello, I would like two tickets for the premiere of the movie today at 7:00 p.m. </li>
            <li><b>Person 2:</b> Sure thing, that'll be $20. Will you be paying with cash or credit card?</li>
            <li><b>Person 1:</b> I'll pay with my credit card.</li>
            <li><b>Person 2:</b> What seats would you like to take?</li>
            <li><b>Person 1:</b> We would like to sit in row G, seats 12 to 13.</li>
            <li><b>Person 2:</b> Great. Your total comes to $20. Here are your tickets.</li>
            <li><b>Person 1:</b> I'd like a medium box of popcorn and a large coke please.</li>
            <li><b>Person 2:</b> Would you like to add extra butter or upgrade your combo?</li>
            <li><b>Person 1:</b> No, this is fine, thank you.</li>
            <li><b>Person 2:</b> Great. Your total comes to $45, ¡Enjoy the movie!.</li>
            <li><b>Person 1:</b> Thanks you!</li>
          </SubtemaList2>
          <p>
          El vocabulario que se utilizó dentro de esta conversación fue la siguiente:
          </p>
          <SubtemaList2>
            <li>Tickets → Boletos</li>
            <li>Seats → Asientos</li>
            <li>Row → Filas</li>
            <li>Popcorns → Palomitas</li>
            <li>Movie → Pelicula</li>
          </SubtemaList2>
        </SubtemaContent>

        <ActivitiesSection>
          <h3>Actividades:</h3>
          <Link to="/oracion6"><ActivityButton>Completa la oración</ActivityButton></Link>
          <Link to="/unir6"><ActivityButton>Conectar palabras</ActivityButton></Link>
          <Link to="/crucigrama6"><ActivityButton>Crucigrama</ActivityButton></Link>
        </ActivitiesSection>

        <NavigationButtons>
          <button><Link to="/crucigrama5">Anterior</Link></button>
          <button><Link to="/oracion6">Siguiente</Link></button>
        </NavigationButtons>
      </SubtemaContainer>   

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
