import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Estilo para el título
export const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
    &::after {
    content: '';
    display: block;
    width: 100%; /* Puedes ajustar el ancho si es necesario */
    height: 1px;
    background-color: #ccc; /* Cambia el color según tu preferencia */
    margin: 25px auto 0; /* Margen superior para separar del título */
  }
`;

export const CrucigramaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  align-items: center;

`;

export const CrosswordContainer = styled.div`
display: grid;
grid-template-columns: repeat(8, 60px); /* Ajustado a 8 columnas */
gap: 2px;
justify-content: center;
`;

export const Cell = styled.input`
width: 60px;
height: 60px;
text-align: center;
font-size: 20px;
font-weight: bold;
border: 1px solid #ababab;
background-color: ${(props) => props.color || "white"};
outline: none;

&:disabled {
  background-color: transparent;
  border: 1px solid transparent;
}
`;

export const NumberedCell = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 0.8rem;
    color: #007bff;
  }

  input {
    margin-top: 10px;
  }
`;

export const PistasContainer = styled.div`
  width: 600px;
  margin-right: 20px;
  padding: 10px;
  border: none;
`;

export const Pista = styled.div`
  margin-bottom: 10px;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #333;
`;

export const Message = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 1.2rem;
  color: #4CAF50;
  font-weight: bold;
  text-align: center;
`;

// Estilo para el mensaje de puntaje
export const ScoreMessage = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 1.2rem;
  color: #4CAF50;
  font-weight: bold;
  text-align: center;
`;

export const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 50px auto 35px auto; /* 50px arriba, 35px abajo y centrado horizontalmente */
  display: block; /* Asegura que el botón se trate como un bloque para que el margen funcione */


  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

// Botones de navegación
export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 30px;

  button {
    padding: 10px 20px;
    background-color: #0056b3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0023b3;
    }
  }
    a {
    color: white;
    text-decoration: none;
  }
`;