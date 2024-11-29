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
      select1: [],
      select2: [],
      select3: [],
      select4: [],
      select5: [],
      select6: [],
      select7: [],
      select8: [],
    });

    const [answers, setAnswers] = useState({
      select1: '',
      select2: '',
      select3: '',
      select4: '',
      select5: '',
      select6: '',
      select7: '',
      select8: '',
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
                  select1: data["1"] || [],
                  select2: data["2"] || [],
                  select3: data["3"] || [],
                  select4: data["4"] || [],
                  select5: data["5"] || [],
                  select6: data["6"] || [],
                  select7: data["7"] || [],
                  select8: data["8"] || [],
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
        id_actividad: 2, // Reemplaza esto con el ID de la actividad correspondiente
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
        select1: 'seeing',
        select2: 'surfing',
        select3: 'study',
        select4: 'watching',
        select5: 'eat',
        select6: 'staying',
        select7: 'playing',
        select8: 'wake up',
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
            <h3><em>Read the following text carefully and answer the questions.</em></h3>
          <form>
          {['select1'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>{index + 1}. </em> I love
              <Select name="select1" value={answers.select1} onChange={handleChange}>
                <option value="">
                  Select an option
                </option>
                {options.select1?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              my friends.
            </p>
            </Question>
        ))}

          {['select2'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>2. </em> He enjoys
              <Select name="select2" value={answers.select2} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select2?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              the internet.
            </p>
            </Question>
        ))}

          {['select2'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
              <em>3. </em> I like to
              <Select name="select3" value={answers.select3} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select3?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              English.
            </p>
            </Question>
        ))}

          {['select4'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>4. </em> They hate
              <Select name="select4" value={answers.select4} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select4?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              horror films.
            </p>
            </Question>
        ))}

          {['select5'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>5. </em> I like to
              <Select name="select5" value={answers.select5} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select5?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              pizza for dinner.
            </p>
            </Question>
        ))}

          {['select6'].map((selectName, index) => (
          <Question key={selectName}>           
           <p>
              <em>6. </em> We don't mind
              <Select name="select6" value={answers.select6} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select6?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              in.
            </p>
            </Question>
        ))}

          {['select7'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>7. </em> You don't like
              <Select name="select7" value={answers.select7} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select7?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              soccer.
            </p>
            </Question>
        ))}

          {['select8'].map((selectName, index) => (
          <Question key={selectName}>
          <p>
              <em>8. </em> I don't like to
              <Select name="select8" value={answers.select8} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select8?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              early.
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
      <Title>Activity 1. Complete the sentences</Title>
      <OracionActivity /> {/* Componente de la actividad */}
      <NavigationButtons>
          <Link to="/subtema1"><button>Anterior</button></Link>
          <Link to="/unir1"><button>Siguiente</button></Link>
        </NavigationButtons>
      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
