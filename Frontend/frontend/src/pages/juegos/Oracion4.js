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
      select25: [],
      select26: [],
      select27: [],
      select28: [],
      select29: [],
      select30: [],
      select31: [],
      select32: [],
    });

    const [answers, setAnswers] = useState({
      select25: '',
      select26: '',
      select27: '',
      select28: '',
      select29: '',
      select30: '',
      select31: '',
      select32: '',
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
                  select25: data["25"] || [],
                  select26: data["26"] || [],
                  select27: data["27"] || [],
                  select28: data["28"] || [],
                  select29: data["29"] || [],
                  select30: data["30"] || [],
                  select31: data["31"] || [],
                  select32: data["32"] || [],
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
        id_actividad: 11, // Reemplaza esto con el ID de la actividad correspondiente
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
        select25: "works",
        select26: "like",
        select27: "teach",
        select28: "play",
        select29: "studies",
        select30: "plays",
        select31: "drinks",
        select32: "smoke",
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
          {['select25'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>{index + 1}. </em> Sam 
              <Select name="select25" value={answers.select25} onChange={handleChange}>
                <option value="">
                  Select an option
                </option>
                {options.select25?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              in a hospital.
            </p>
            </Question>
        ))}

          {['select26'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>2. </em> Do you
              <Select name="select26" value={answers.select26} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select26?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  the fish in the lunch?
            </p>
            </Question>
        ))}

          {['select27'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
              <em>3. </em> She doesn't  
              <Select name="select27" value={answers.select27} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select27?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  English.
            </p>
            </Question>
        ))}

          {['select28'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>4. </em> Does she 
              <Select name="select28" value={answers.select28} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select28?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              football in the morning?
            </p>
            </Question>
        ))}

          {['select29'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>5. </em> Michelle
              <Select name="select29" value={answers.select29} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select29?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  English at university.
            </p>
            </Question>
        ))}

          {['select30'].map((selectName, index) => (
          <Question key={selectName}>           
           <p>
              <em>6. </em> Lisa
              <Select name="select30" value={answers.select30} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select30?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              tennis twice a week.           
          </p>
            </Question>
        ))}

          {['select31'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>7. </em> She usually 
              <Select name="select31" value={answers.select31} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select31?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              coffe at the morning.
            </p>
            </Question>
        ))}

          {['select32'].map((selectName, index) => (
          <Question key={selectName}>
          <p>
              <em>8. </em> My mother never
              <Select name="select32" value={answers.select32} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select32?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              in his life.
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
          <button><Link to="/subtema4">Anterior</Link></button>
          <button><Link to="/unir4">Siguiente</Link></button>
        </NavigationButtons>
      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
