import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
    h3{
    text-align: center;
  }
`;

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

export const ActivityWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;


`;

export const PairRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
`;


export const TextOption = styled.div`
  flex: 1;
  max-width: 200px; /* Ancho máximo para limitar el texto */
  background-color: #b4c1e4;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 18px;
  cursor: grab;

  &:hover {
    background-color: #b7c7f3;
  }
`;

export const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    border-color: #1f4ba7;
  }
`;

export const Line = styled.div`
  position: absolute;
  height: 2px;
  background-color: #1f4ba7;
  z-index: -1;
  transition: all 0.3s ease-in-out;
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
