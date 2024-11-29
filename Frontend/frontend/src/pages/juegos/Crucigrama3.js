import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  HomeContainer,
  CrosswordContainer,
  Cell,
  Title,
  SubmitButton,
  ScoreMessage,
  PistasContainer,
  Pista,
  NavigationButtons,
} from "../../styles/CrucigramaStyles";

function HomePage() {
  const [answers, setAnswers] = useState(Array(64).fill(""));
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [userData, setUserData] = useState({ id: null, name: "" });

  const token = localStorage.getItem("token");
  const id_estudiante = localStorage.getItem("id_estudiante");

  const crosswordStructure = [
    { word: "HISTORY", direction: "vertical", startIndex: 7 },
    { word: "GROUPS", direction: "horizontal", startIndex: 18 },
    { word: "READ", direction: "vertical", startIndex: 19 },
    { word: "DETAIL", direction: "horizontal", startIndex: 32 },
    { word: "ERA", direction: "vertical", startIndex: 33 },
  ];
  
  const [scoreMessage, setScoreMessage] = useState(''); // Estado para mostrar el puntaje


  // Fetch user data
  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch("http://localhost:3001/home", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setUserData({ id: id_estudiante, name: result.name || "Estudiante" });
    };

    fetchProtectedData();
  }, [token, id_estudiante]);

  // Fetch correct answers
  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getAllAnswers", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Respuestas recibidas:', data);
          setCorrectAnswers(data); // Suponiendo que `data` tiene el formato correcto
        } else {
          console.error("Error al obtener respuestas correctas");
        }
      } catch (error) {
        console.error("Error en la solicitud de respuestas:", error);
      }
    };

    fetchCorrectAnswers();
  }, [token]);

  const handleChange = (index, value) => {
    if (value.length > 1 || !/^[A-Za-z]*$/.test(value)) return;
  
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value.toUpperCase();
    setAnswers(updatedAnswers);
  
    // Encuentra la dirección de la celda actual (horizontal o vertical)
    const currentDirection = crosswordStructure.find((pista) =>
      pista.word
        .split("")
        .map((_, i) =>
          pista.direction === "horizontal"
            ? pista.startIndex + i
            : pista.startIndex + i * 8
        )
        .includes(index)
    )?.direction;
  
    // Calcula el próximo índice según la dirección
    let nextIndex;
    if (currentDirection === "horizontal") {
      nextIndex = index + 1; // Mueve a la derecha
    } else if (currentDirection === "vertical") {
      nextIndex = index + 8; // Mueve hacia abajo
    }
  
    // Solo mueve el foco si el próximo índice está en la misma palabra
    if (
      nextIndex !== undefined &&
      crosswordStructure.some((pista) =>
        pista.word
          .split("")
          .map((_, i) =>
            pista.direction === "horizontal"
              ? pista.startIndex + i
              : pista.startIndex + i * 8
          )
          .includes(nextIndex)
      )
    ) {
      const nextInput = document.getElementById(`cell-${nextIndex}`);
      if (nextInput) nextInput.focus();
    }
  };

  const getNextIndex = (currentIndex) => {
    // Encuentra el siguiente índice que no esté deshabilitado
    for (let i = currentIndex + 1; i < 64; i++) {
      const isDisabled = !crosswordStructure.some((pista) =>
        pista.word
          .split("")
          .map((_, j) =>
            pista.direction === "horizontal"
              ? pista.startIndex + j
              : pista.startIndex + j * 8
          )
          .includes(i)
      );
      if (!isDisabled) return i; // Devuelve el índice válido
    }
    return null; // No hay más celdas disponibles
  };

  const enviarResultados = async (score) => {
    try {
      const response = await fetch("http://localhost:3001/api/saveResults", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_estudiante,
          id_actividad: 7,
          respuestas_correctas: score,
          calificacion_total: 5,
          promedio: (score / 5) * 100,
        }),
      });

      if (response.ok) {
        console.log("Resultados guardados exitosamente");
      } else {
        const errorText = await response.text();
        console.error("Error al guardar los resultados:", errorText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const checkAnswers = () => {
    // Verificar si todas las celdas necesarias están llenas
    const allAnswersFilled = crosswordStructure.every((pista) => {
      // Comprobamos que todas las celdas de la palabra estén llenas
      const wordCells = pista.word.split("").map((_, i) => 
        pista.direction === "horizontal" 
          ? pista.startIndex + i 
          : pista.startIndex + i * 8
      );
  
      return wordCells.every((index) => answers[index] !== "");
    });
  
    // Si alguna celda está vacía, mostramos el mensaje de advertencia y detenemos el proceso
    if (!allAnswersFilled) {
      setScoreMessage("Rellena todos los campos."); // Mensaje de advertencia
      return; // No continúa con el envío si hay preguntas sin respuesta
    }
  
    // Creamos un objeto para registrar las celdas ocupadas con sus letras
    let occupiedCells = {};
  
    // Función para verificar si una celda está ocupada y si la letra es correcta
    const isCellOccupied = (index, letter) => {
      if (occupiedCells[index]) {
        // Si la celda ya tiene una letra asignada, verificamos si coincide
        return occupiedCells[index] === letter;
      }
      // Si no está ocupada, la marcamos como ocupada
      occupiedCells[index] = letter;
      return true;
    };
// Recolectar las palabras
const userWords = {
  10: [answers[7], answers[15], answers[23], answers[31], answers[39], answers[47], answers[55], answers[63]].map((answer, index) => {
    console.log(`Palabra 10: Celda ${index} -> ${answer}`); // Imprime cada celda para la palabra "WAKE"
    return answer;
  }).join(""), // "WAKE"
  
  11: [answers[18], answers[19], answers[20], answers[21], answers[22], answers[23]].map((answer, index) => {
    console.log(`Palabra 11: Celda ${index} -> ${answer}`); // Imprime cada celda para la palabra "WALK"
    return answer;
  }).join(""), // WALK
  
  12: [answers[19], answers[27], answers[35], answers[43]].map((answer, index) => {
    console.log(`Palabra 12: Celda ${index} -> ${answer}`); // Imprime cada celda para la palabra "PAINT"
    return answer;
  }).join(""), // EAT

  13: [answers[32], answers[33], answers[34], answers[35], answers[36], answers[37]].map((answer, index) => {
    console.log(`Palabra 13: Celda ${index} -> ${answer}`); // Imprime cada celda para la palabra "CINEMA"
    return answer;
  }).join(""), // GO
  
  14: [answers[33], answers[41], answers[49]].map((answer, index) => {
    console.log(`Palabra 14: Celda ${index} -> ${answer}`); // Imprime cada celda para la palabra "MUSIC"
    return answer;
  }).join(""), // DRINK
};

// Ahora podemos comprobar cómo se gestionan las celdas compartidas
console.log(userWords);

    let score = 0;
    for (let key in correctAnswers) {
      console.log(`Comparando palabra ${key}: usuario "${userWords[key]}" vs correcta "${correctAnswers[key]}"`); // Log de comparación
      if (userWords[key] === correctAnswers[key]) {
        score++;
      }
    }

    setScoreMessage(`Your score is ${score}/5`); // Mostrar el puntaje en pantalla
    enviarResultados(score); // Llamar a la función para enviar los resultados al servidor
  
  };

  return (
    <HomeContainer>
      <Navbar />
      <Title>Activity 3. Crossword</Title>
      <h3 style={{ textAlign: "center" }}>
        <em>Read the word in Spanish and write it in English in its corresponding number.</em>
      </h3>
      <div
        style={{ display: "flex", justifyContent: "space-around", padding: "50px 130px 10px 130px" }}
      >
        {/* Contenedor de pistas */}
        <PistasContainer>
          <h2>Pistas</h2>
          <h3>Vertical</h3>
          <Pista>
            <strong>1. Historia:</strong> Estudio de eventos pasados y cómo han influido en el presente.
          </Pista>
          <Pista>
            <strong>3. Leer:</strong> Acción de mirar y comprender palabras escritas.
          </Pista>
          <Pista>
            <strong>5. Época:</strong> Un periodo significativo en la historia.
          </Pista>
          <br />
          <h3>Horizontal</h3>
          <Pista>
            <strong>2. Grupos:</strong> Conjuntos de personas o cosas con características comunes.
          </Pista>
          <Pista>
            <strong>4. Detalle:</strong> Información específica y particular en un artículo.
          </Pista>
        </PistasContainer>

        {/* Contenedor del crucigrama */}
        <CrosswordContainer>
          {Array(64)
            .fill("")
            .map((_, index) => {
              const isDisabled = !crosswordStructure.some((pista) =>
                pista.word
                  .split("")
                  .map((_, i) =>
                    pista.direction === "horizontal"
                      ? pista.startIndex + i
                      : pista.startIndex + i * 8
                  )
                  .includes(index)
              );

              const startNumber = crosswordStructure.find(
                (pista) => pista.startIndex === index
              );

              return (
                <div style={{ position: "relative" }} key={index}>
                  {/* Número en la esquina superior izquierda */}
                  {startNumber && (
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: "2px",
                        fontSize: "10px",
                        color: "#000",
                      }}
                    >
                      {crosswordStructure.indexOf(startNumber) + 1}
                    </span>
                  )}

                  {/* Celda del crucigrama */}
                  <Cell
                    id={`cell-${index}`} // Asignar un ID único
                    maxLength={1}
                    disabled={isDisabled}
                    value={answers[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    color={isDisabled ? "transparent" : "#cbe3fc"}
                  />
                </div>
              );
            })}
        </CrosswordContainer>
      </div>

      {scoreMessage && <ScoreMessage>{scoreMessage}</ScoreMessage>}
      <SubmitButton onClick={checkAnswers}>Enviar</SubmitButton>

      <NavigationButtons>
        <button>
          <Link to="/unir3">Anterior</Link>
        </button>
        <button>
          <Link to="/subtema4">Siguiente</Link>
        </button>
      </NavigationButtons>
      <Footer />
    </HomeContainer>
  );
}

export default HomePage;
