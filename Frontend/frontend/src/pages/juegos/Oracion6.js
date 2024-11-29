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
      select41: [],
      select42: [],
      select43: [],
      select44: [],
      select45: [],
      select46: [],
      select47: [],
      select48: [],
    });

    const [answers, setAnswers] = useState({
      select41: '',
      select42: '',
      select43: '',
      select44: '',
      select45: '',
      select46: '',
      select47: '',
      select48: '',
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
                  select41: data["41"] || [],
                  select42: data["42"] || [],
                  select43: data["43"] || [],
                  select44: data["44"] || [],
                  select45: data["45"] || [],
                  select46: data["46"] || [],
                  select47: data["47"] || [],
                  select48: data["48"] || [],
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
        id_actividad: 17, // Reemplaza esto con el ID de la actividad correspondiente
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
        select41: "tickets",
        select42: "popcorns",
        select43: "row",
        select44: "credit card",
        select45: "ticket office",
        select46: "discounts",
        select47: "promotions",
        select48: "upgrade",
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
          {['select41'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>{index + 1}. </em> Could you give me three  
              <Select name="select41" value={answers.select41} onChange={handleChange}>
                <option value="">
                  Select an option
                </option>
                {options.select41?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              for the next movie at 7:30 pm.
            </p>
            </Question>
        ))}

          {['select42'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
            <em>2. </em>  I would like to add extra butter to my   
              <Select name="select42" value={answers.select42} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select42?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                      please.
            </p>
            </Question>
        ))}

          {['select43'].map((selectName, index) => (
          <Question key={selectName}>
            <p>
              <em>3. </em> I would like buy tickets and select the seat 4 in 
              <Select name="select43" value={answers.select43} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select43?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  G.
            </p>
            </Question>
        ))}

          {['select44'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>4. </em> I will pay by 
              <Select name="select44" value={answers.select44} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select44?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                to received bonus gifts.
            </p>
            </Question>
        ))}

          {['select45'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>5. </em> I prefer to buy my tickets online because the 
              <Select name="select45" value={answers.select45} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select45?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
                  is very full.
            </p>
            </Question>
        ))}

          {['select46'].map((selectName, index) => (
          <Question key={selectName}>           
           <p>
              <em>6. </em> If you are student, remember that you have
              <Select name="select46" value={answers.select46} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select46?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              when presenting your identification.          
          </p>
            </Question>
        ))}

          {['select47'].map((selectName, index) => (
          <Question key={selectName}>            
          <p>
              <em>7. </em> On wednesday there are 
              <Select name="select47" value={answers.select47} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select47?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              if you buy big popcorns.
            </p>
            </Question>
        ))}

          {['select48'].map((selectName, index) => (
          <Question key={selectName}>
          <p>
              <em>8. </em> Did you want 
              <Select name="select48" value={answers.select48} onChange={handleChange}>
                <option value="" >
                  Select an option
                </option>
                {options.select48?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              your combo?
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
          <button><Link to="/subtema6">Anterior</Link></button>
          <button><Link to="/unir6">Siguiente</Link></button>
        </NavigationButtons>
      <Footer /> {/* Incluimos el Footer */}
    </HomeContainer>
  );
}

export default HomePage;
