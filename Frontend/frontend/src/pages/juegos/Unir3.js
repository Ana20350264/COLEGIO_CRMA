import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { 
  HomeContainer,
  Title,
  ActivityWrapper,
  PairRow,
  TextOption,
  ImageContainer,
  SubmitButton,
  NavigationButtons,
  ScoreMessage,  // Importa el nuevo estilo para el mensaje de puntaje
} from '../../styles/UnirStyles'; 
import img1 from '../../img/tema3/3fly.jpg';
import img2 from '../../img/tema3/5study.jpg';
import img3 from '../../img/tema3/4physics.jpg';
import img4 from '../../img/tema3/2fall.jpg';
import img5 from '../../img/tema3/1search.jpg';

function HomePage() {
  const [data, setData] = useState(null);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [scoreMessage, setScoreMessage] = useState(''); // Estado para el mensaje de puntaje
  const token = localStorage.getItem('token'); 
  const id_estudiante = localStorage.getItem('id_estudiante'); 
  const items = [
    { id: 1, text: 'FLY' },
    { id: 2, text: 'STUDY' },
    { id: 3, text: 'PHYSICS' },
    { id: 4, text: 'FALL' },
    { id: 5, text: 'SEARCH' },
  ];

  const images = [
    { id: 1, src: img2 },
    { id: 2, src: img1 },
    { id: 3, src: img5 },
    { id: 4, src: img3 },
    { id: 5, src: img4 },
  ];

  const imageRefs = useRef([]);
  const textOptionRefs = useRef([]);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch('http://localhost:3001/home', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener datos protegidos');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getCorrectAnswers');
        if (!response.ok) {
          throw new Error('Error al obtener respuestas correctas');
        }
    
        const result = await response.json();
        const filteredAnswers = result.map((answer) => ({
          text: answer.text.trim(),
          imageId: answer.imageId,
        }));
    
        setCorrectAnswers(filteredAnswers);
      } catch (error) {
        console.error('Error al obtener respuestas correctas:', error);
      }
    };

    fetchProtectedData();
    fetchAnswers();
  }, [token]);

  const handleSubmit = async () => {
    if (selectedPairs.length < items.length) {
      setScoreMessage("Por favor, responde todas las preguntas antes de enviar.");
      return;
    }
    
    let respuestasCorrectas = 0;

    selectedPairs.forEach((pair) => {
      const cleanText = pair.item.text.split(' - ')[0];

      const isCorrect = correctAnswers.some(
        (answer) => answer.text === cleanText && answer.imageId === pair.image.id
      );

      if (isCorrect) {
        respuestasCorrectas++;
      }
    });

    const totalItems = images.length;
    const promedio = (respuestasCorrectas / totalItems) * 100;

    const enviarResultados = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/saveResults', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_estudiante: id_estudiante,
            id_actividad: 9,
            respuestas_correctas: respuestasCorrectas,
            calificacion_total: totalItems,
            promedio: promedio,
          }),
        });

        if (response.ok) {
          console.log('Resultados guardados exitosamente');
        } else {
          const errorText = await response.text();
          console.error('Error al guardar los resultados:', errorText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    enviarResultados();
    setScoreMessage(`Tu puntaje es: ${respuestasCorrectas} de ${totalItems}.`); // Muestra el puntaje
  };

  const handleDrop = (item, image) => {
    const isImageAlreadySelected = selectedPairs.some(pair => pair.image.id === image.id);
    if (isImageAlreadySelected) {
      setScoreMessage("Esta imagen ya ha sido seleccionada para otra respuesta.");
      return;
    }

    const isItemAlreadyLinked = selectedPairs.some(pair => pair.item.text === item.text);
    if (isItemAlreadyLinked) {
      setScoreMessage("Esta respuesta ya tiene una imagen vinculada.");
      return;
    }

    setSelectedPairs((prev) => {
      const newPairs = [...prev, { item, image }];
      return newPairs;
    });

    const imageIndex = images.findIndex(img => img.id === image.id);
    imageRefs.current[imageIndex].style.border = '5px solid #2fc02d';  // Aplica borde inmediatamente
    const textOptionIndex = items.findIndex(it => it.id === item.id);
    textOptionRefs.current[textOptionIndex].style.border = '3px solid #2fc02d';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <HomeContainer>
      <Navbar />
      <Title>Activity 2. Join words</Title>

      <ActivityWrapper>
        <h3><em>Drag and drop the labels to match them with the images.</em></h3>
        {items.map((item, index) => {
          const connectedImage = selectedPairs.find(pair => pair.item.id === item.id)?.image;
          const isSelected = connectedImage && selectedPairs.some(pair => pair.image.id === images[index].id);
          
          return (
            <PairRow key={item.id}>
              <TextOption
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(item))}
                ref={(el) => (textOptionRefs.current[index] = el)}
                style={{ border: isSelected ? '3px solid #2fc02d' : 'none' }}
              >
                {item.text}
              </TextOption>

              <ImageContainer
                onDrop={(e) => {
                  const draggedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
                  handleDrop(draggedItem, images[index]);
                }}
                onDragOver={handleDragOver}
                ref={(el) => (imageRefs.current[index] = el)}
                style={{
                  border: isSelected ? '5px solid #2fc02d' : '2px dashed #ccc',
                  backgroundColor: isSelected ? '#e0e7ff' : '#f9f9f9',
                }}
              >
                <img src={images[index].src} alt={`Image ${images[index].id}`} />
              </ImageContainer>
            </PairRow>
          );
        })}
      </ActivityWrapper>

      {scoreMessage && <ScoreMessage>{scoreMessage}</ScoreMessage>} {/* Muestra el mensaje de puntaje */}

      <SubmitButton type="button" onClick={handleSubmit}>
        Enviar
      </SubmitButton>

      <NavigationButtons>
        <button><Link to="/oracion3">Anterior</Link></button>
        <button><Link to="/crucigrama3">Siguiente</Link></button>
      </NavigationButtons>

      <Footer />
    </HomeContainer>
  );
}

export default HomePage;
