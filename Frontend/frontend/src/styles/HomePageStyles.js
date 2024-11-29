import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const Banners = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

export const Quote = styled.div`
  font-size: 1.5rem;
  font-style: italic;
  margin: 20px 0;
  span {
    display: block;
    font-size: 1rem;
    margin-top: 10px;
  }
`;

export const SubtemaCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
  margin: 0 30px; /* Añadido margen a los lados */
  margin-bottom: 30px;
`;

export const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  /* Distribuye la imagen y el texto uniformemente */
  height: 330px;                   /* Ajusta la altura de la tarjeta para que todas sean iguales */
  &:hover {
    transform: scale(1.05);
  }
      a {
    color: black;
    margin: 0 15px;
    text-decoration: none;
    font-weight: bold;
  }
`;

export const CardImageContainer = styled.div`
  height: 150px; /* Asegura que todas las imágenes ocupen el mismo espacio */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardImage = styled.img`
  max-width: 80%; /* Asegura que la imagen no exceda el tamaño del contenedor */
  height: auto; /* Mantén la proporción de la imagen */
  display: block; /* Evita cualquier margen o desplazamiento adicional */
  margin: 0 auto; /* Asegura el centrado horizontal */
  padding-bottom: 32px;
`;


export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 5px;
  text-align: center;
  min-height: 20px;  /* Asegura que todas las líneas de texto tengan la misma altura */
  display: flex;
  align-items: center;
  justify-content: center;
`;

