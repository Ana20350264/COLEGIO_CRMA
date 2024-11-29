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
import BASE_URL from '../../config/apiConfig';

function HomePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');  // Obtenemos el token del localStorage
  const id_estudiante = localStorage.getItem('id_estudiante'); // Obtenemos el id_estudiante del localStorage

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch(`${BASE_URL}/home`, {
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
      select9: [],
      select10: [],
      select11: [],
      select12: [],
      select13: [],
      select14: [],
      select15: [],
      select16: [],
    });

    const [answers, setAnswers] = useState({
      select9: '',
      select10: '',
      select11: '',
      select12: '',
      select13: '',
      select14: '',
      select15: '',
      select16: '',
    });

    const [scoreMessage, setScoreMessage] = useState(''); // Estado para mostrar el puntaje

    // Cargar las opciones de las respuestas desde la base de datos
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const response = await fetch('http://192.168.0.20:3001/api/getOptions'); // Ruta para obtener las opciones
          const data = await response.json();
          console.log('Opciones recibidas:', data);  // Verifica los datos
          setOptions(data); // Establecer las opciones que recibimos del servidor
          
                // Asegúrate de que las opciones se asignen correctamente a cada select
                setOptions({
                  select9: data["9"] || [],
                  select10: data["10"] || [],
                  select11: data["11"] || [],
                  select12: data["12"] || [],
                  select13: data["13"] || [],
                  select14: data["14"] || [],
                  select15: data["15"] || [],
                  select16: data["16"] || [],
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
    const response = await fetch('http://192.168.0.20:3001/api/saveResults', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Token para autenticación
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_estudiante: id_estudiante, // Utiliza el id_estudiante almacenado
        id_actividad: 5, // Reemplaza esto con el ID de la actividad correspondiente
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
        select9: "has",
        select10: "doesn't",
        select11: "carry",
        select12: "doing",
        select13: "don't",
        select14: "goes",
        select15: "does",
        select16: "watch",
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
          {['select9'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>{index + 1}. </em> She always
              <Select name="select9" value={answers.select9} onChange={handleChange}>
                <option value="">
                  Select an option
                </option>
                {options.select9?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              a cup of tea in the morning.
            </p>
            </Question>
        ))}

          {['select10'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>2. </em> He 
              <Select name="select10" value={answers.select10} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select10?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              want to go to the beach.
            </p>
            </Question>
        ))}

          {['select11'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
              <em>3. </em> She
              <Select name="select11" value={answers.select11} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select11?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              my bags for me when we go to the supermarket.
            </p>
            </Question>
        ))}

          {['select12'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>4. </em> I am
              <Select name="select12" value={answers.select12} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select12?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              my homework now and later I will go to the cinema.
            </p>
            </Question>
        ))}

          {['select13'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>5. </em>  I
              <Select name="select13" value={answers.select13} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select13?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              understand what you are saying.
            </p>
            </Question>
        ))}

          {['select14'].map((selectName, index) => (
          <Question key={selectName}>           
           <p>
              <em>6. </em> She
              <Select name="select14" value={answers.select14} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select14?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              to school every day            
              </p>
            </Question>
        ))}

          {['select15'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>7. </em>  Where
              <Select name="select15" value={answers.select15} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select15?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              she often travel on bussiness?
            </p>
            </Question>
        ))}

          {['select16'].map((selectName, index) => (
          <Question key={selectName}>
          <p>
              <em>8. </em> My mother never
              <Select name="select16" value={answers.select16} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select16?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              TV in her bedroom.
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
          <button><Link to="/subtema2">Anterior</Link></button>
          <button><Link to="/unir2">Siguiente</Link></button>
        </NavigationButtons>
      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
