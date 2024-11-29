import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  HomeContainer,
  SubtemaContainer,
  SubtemaTitle,
  SubtemaContent,
  SubtemaList,
  VideoSection,
  ActivitiesSection,
  ActivityButton,
  NavigationButtons,
  SubtemaList2
} from '../styles/Subtema'; // Importa todos los estilos necesarios
import Video from '../img/Simple Present.mp4';
import BASE_URL from '../config/apiConfig';

function HomePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/home`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Enviamos el token en la cabecera Authorization
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchProtectedData();
  }, [token]);

  return (
    <HomeContainer>
      <Navbar /> {/* Incluimos el Navbar */}

      <SubtemaContainer>
        <SubtemaTitle>Subtema 1: Hablar sobre actividades culturales, gustos y no gustos.</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <em>Competencia a desarrollar: Hablar sobre actividades culturales, gustos y no gustos.</em>
          <p>
            Las actividades culturales son aquellas que están relacionadas con la expresión y la promoción de la cultura. Estas pueden incluir una amplia variedad de eventos, espectáculos y actividades que promueven el arte, la música, la literatura, la danza, la gastronomía, la historia, la arquitectura, entre otras.
          </p>
          <p>Algunos ejemplos de actividades culturales pueden ser:</p>
          <SubtemaList>
            <li>Exposiciones de arte - Art exhibitions</li>
            <li>Conciertos de música - Music concerts</li>
            <li>Festivales de cine - Film festivals</li>
            <li>Representaciones teatrales - Theatrical performances</li>
            <li>Ferias de libros - Book fairs</li>
            <li>Desfiles de moda - Fashion shows</li>
            <li>Festivales de comida - Food festivals</li>
            <li>Leer un libro – Read a book</li>
            <li>Ver una película – Watch a movie</li>
            <li>Practicar danza – Practice dance</li>
            <li>Jugar futbol – Play soccer</li>
          </SubtemaList>
          <p>En resumen, las actividades culturales son una forma de difundir.</p>
          <br></br>
        </SubtemaContent>

        <SubtemaTitle>Gustos en ingles.</SubtemaTitle>
        <br></br>
        <SubtemaContent>
          <p>Los gustos y no gustos son las preferencias personales que un individuo  tiene por ciertas cosas o actividades. Los gustos son aquellas cosas que le gustan o disfrutan a una persona, mientras que los no gustos son aquellas cosas que no le agradan o no disfrutan.</p>
          <p>Estas preferencias pueden variar de una persona a otra, ya que están influenciadas por factores como la educación, la cultura, la edad, las experiencias previas y la personalidad.</p>
          <p>Como regla general, recuerda que los verbos que expresan tus preferencias (like, love, dislike, etc) solo admiten dos opciones gramaticales en lo que al verbo se refiere:</p>
          <em>Infinitivo + to</em>
          <em>Forma –ing</em>
          <p>Puedes decir I like to play o I like playing, pero nunca I like play. Algunos de los verbos que necesitarás para expresar tus gustos en inglés son:</p>
          <SubtemaList2>
            <li>I love reading – me encanta leer</li>
            <li>I quite like singing – cantar me gusta bastante</li>
            <li>I like doing sport – me gusta hacer deporte</li>
            <li>I don’t mind cooking – no me importa cocinar</li>
            <li>I don’t like cleaning – no me gusta limpiar</li>
            <li>I hate running – odio correr</li>
          </SubtemaList2>        
          </SubtemaContent>

        <VideoSection>
          <video controls width="100%">
            <source src={Video} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </VideoSection>

        <ActivitiesSection>
          <h3>Actividades:</h3>
          <Link to="/oracion1"><ActivityButton>Completa la oración</ActivityButton></Link>
          <Link to="/unir1"><ActivityButton>Conectar palabras</ActivityButton></Link>
          <Link to="/crucigrama1"><ActivityButton>Crucigrama</ActivityButton></Link>
        </ActivitiesSection>

        <NavigationButtons>
          <Link to="/home"><button>Anterior</button></Link>
          <Link to="/oracion1"><button>Siguiente</button></Link>
        </NavigationButtons>
      </SubtemaContainer>

      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;