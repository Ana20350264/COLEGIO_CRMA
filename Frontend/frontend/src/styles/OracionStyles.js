import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Estilo para el contenedor de la página de inicio
export const OracionContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center; /* Centra horizontalmente */
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

// Estilo para cada pregunta con el select
export const Question = styled.div`
  margin: 10px 0;
  font-size: 1.2rem;
  width: 100%;
  text-align: justify;
  line-height: 2;

`;

// Estilo para el select (cambia su apariencia)
export const Select = styled.select`
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border 0.3s, background-color 0.3s;

  &:focus {
    border-color: #0056b3;
    background-color: #e6f0fa;
  }
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

// Estilo para el botón
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
    padding: 12px 20px;
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
