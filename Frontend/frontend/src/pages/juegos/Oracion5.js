import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { 
  HomeContainer,
  OracionContainer, 
  Title, 
  Question, 
  Select, 
  ScoreMessage, 
  SubmitButton,
  NavigationButtons,
} from '../../styles/OracionStyles';

function HomePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');  // Obtenemos el token del localStorage
  const id_estudiante = localStorage.getItem('id_estudiante'); // Obtenemos el id_estudiante del localStorage

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch('http://localhost:3001/home', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Enviamos el token en la cabecera Authorization
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setData(result);
    };

    fetchProtectedData();
  }, [token]);

  // Componente de actividad de completar oraciones
  const OracionActivity = () => {
    const [options, setOptions] = useState({
      select33: [],
      select34: [],
      select35: [],
      select36: [],
      select37: [],
      select38: [],
      select39: [],
      select40: [],
    });

    const [answers, setAnswers] = useState({
      select33: '',
      select34: '',
      select35: '',
      select36: '',
      select37: '',
      select38: '',
      select39: '',
      select40: '',
    });

    const [scoreMessage, setScoreMessage] = useState(''); // Estado para mostrar el puntaje

    // Cargar las opciones de las respuestas desde la base de datos
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/getOptions'); // Ruta para obtener las opciones
          const data = await response.json();
          console.log('Opciones recibidas:', data);  // Verifica los datos
          setOptions(data); // Establecer las opciones que recibimos del servidor
          
                // Asegúrate de que las opciones se asignen correctamente a cada select
                setOptions({
                  select33: data["33"] || [],
                  select34: data["34"] || [],
                  select35: data["35"] || [],
                  select36: data["36"] || [],
                  select37: data["37"] || [],
                  select38: data["38"] || [],
                  select39: data["39"] || [],
                  select40: data["40"] || [],
                });
              } catch (error) {
                console.error('Error fetching options:', error);
              }
      };

      fetchOptions();
    }, []);

    // Manejar el cambio en las respuestas seleccionadas
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAnswers((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

// Función para enviar los resultados
const enviarResultados = async (score) => {
  try {
    const response = await fetch('http://localhost:3001/api/saveResults', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Token para autenticación
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_estudiante: id_estudiante, // Utiliza el id_estudiante almacenado
        id_actividad: 14, // Reemplaza esto con el ID de la actividad correspondiente
        respuestas_correctas: score,
        calificacion_total: 8, // Total de preguntas
        promedio: (score / 8) * 100, // Calcula el porcentaje del promedio
      }),
    });

    if (response.ok) {
      console.log('Resultados guardados exitosamente');
    } else {
      // Leer la respuesta como texto en lugar de JSON si no es un JSON válido
      const errorText = await response.text();
      console.error('Error al guardar los resultados:', errorText);
    }
  } catch (error) {
    console.error('Error en la solicitud ...:', error);
  }
};

    // Función para verificar las respuestas
    const checkAnswers = () => {

      // Verifica si todas las respuestas han sido seleccionadas
  const allAnswersFilled = Object.values(answers).every((answer) => answer !== '');

  if (!allAnswersFilled) {
    setScoreMessage('Rellena todos los campos.'); // Mensaje de advertencia
    return; // No continúa con el envío si hay preguntas sin respuesta
  }

      const correctAnswers = {
        select33: "What's your favorite",
        select34: "Friends",
        select35: "any other",
        select36: "What TV series do you enjoy?",
        select37: "not",
        select38: "character",
        select39: "serious and sophisticated",
        select40: "you will enjoy watching",
      };

      let score = 0;
      Object.keys(answers).forEach((key) => {
        if (answers[key] === correctAnswers[key]) {
          score++;
        }
      });
  
      setScoreMessage(`Your score is ${score}/8`); // Mostrar el puntaje en pantalla
      enviarResultados(score); // Llamar a la función para enviar los resultados al servidor
    };

    return (
    <OracionContainer>
            <Title>Activity 1. Complete the sentences</Title>
            <h3><em>Read the following text carefully and answer the questions.</em></h3>
          <form>
          {['select33'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>{index + 1}. </em> White: 
              <Select name="select33" value={answers.select33} onChange={handleChange}>
                <option value="">
                  Select an option
                </option>
                {options.select33?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              TV Program?
            </p>
            </Question>
        ))}

          {['select34'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>2. </em> Jesse: My favorite TV Program is  
              <Select name="select34" value={answers.select34} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select34?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  because is entertaining.
            </p>
            </Question>
        ))}

          {['select35'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
              <em>3. </em> White: I know that's an excellent television serie, but you don't like  
              <Select name="select35" value={answers.select35} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select35?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  program?
            </p>
            </Question>
        ))}

          {['select36'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>4. </em> Jesse: Nope. 
              <Select name="select36" value={answers.select36} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select36?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                .
            </p>
            </Question>
        ))}

          {['select37'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>5. </em> White: I am watching Web Therapy these days. Do you 
              <Select name="select37" value={answers.select37} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select37?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  this serie?
            </p>
            </Question>
        ))}

          {['select38'].map((selectName, index) => (
          <Question key={selectName}>           
           <p>
              <em>6. </em> Jesse: Oh yes I love this serie my favorite 
              <Select name="select38" value={answers.select38} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select38?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              is Lisa Kudrow she was a funny and weird.           
          </p>
            </Question>
        ))}

          {['select39'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>7. </em> White: No, that woman cannot be funny and weird. She's quite  
              <Select name="select39" value={answers.select39} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select39?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
             nature in Web Therapy.
            </p>
            </Question>
        ))}

          {['select40'].map((selectName, index) => (
          <Question key={selectName}>
          <p>
              <em>8. </em> Jesse: Oh! Really! Now i will see that, and I bet 
              <Select name="select40" value={answers.select40} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select40?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              Friends too.
            </p>
            </Question>
        ))}

        {/* Mostrar el mensaje del puntaje arriba del botón de submit */}
        {scoreMessage && <ScoreMessage>{scoreMessage}</ScoreMessage>}

          <SubmitButton type="button" onClick={checkAnswers}>
              Enviar
            </SubmitButton>
        </form>


        </OracionContainer>
  );
  };

  return (
    <HomeContainer>
      <Navbar /> {/* Incluimos el Navbar */}
      <OracionActivity /> {/* Componente de la actividad */}
      <NavigationButtons>
          <button><Link to="/subtema5">Anterior</Link></button>
          <button><Link to="/unir5">Siguiente</Link></button>
        </NavigationButtons>
      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
