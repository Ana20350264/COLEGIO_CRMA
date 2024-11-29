import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Contenedor principal para el subtema
export const SubtemaContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 1260px;
  font-family: 'Arial', sans-serif;
`;

// Título del subtema
export const SubtemaTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
  margin-top: 40px;
  &::after {
    content: '';
    display: block;
    width: 100%; /* Puedes ajustar el ancho si es necesario */
    height: 1px;
    background-color: #ccc; /* Cambia el color según tu preferencia */
    margin: 25px auto 0; /* Margen superior para separar del título */
  }
`;

// Contenido del subtema
export const SubtemaContent = styled.div`
  font-size: 1.25rem;
  line-height: 1.85;
  margin-bottom: 20px;
  text-align: justify;

  em {
    display: block;
    text-align: center;
    margin-bottom: 15px;
    font-style: italic;
    margin-bottom: 50px;
  }
`;

// Lista de ejemplos
export const SubtemaList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;

  li {
    margin-bottom: 5px;
  }
`;

export const SubtemaList2 = styled.ul`
  list-style-type: none;
  padding-left: 25px;
  margin-bottom: 20px;

  li {
    margin-bottom: 8px;
  }
`;

// Sección de video
export const VideoSection = styled.div`
  margin-bottom: 50px;
  margin-top: 50px;

  video {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

//Seccion imagenes
export const ImageSub = styled.img`
  max-width: 40%; /* Asegura que la imagen no exceda el tamaño del contenedor */
  height: auto; /* Mantén la proporción de la imagen */
  display: block; /* Evita cualquier margen o desplazamiento adicional */
  margin: 0 auto; /* Asegura el centrado horizontal */
`;


export const ActivitiesSection = styled.div`
  display: block;  
  width: 50%;
  margin: 7px auto;

  h3 {
    text-align: center;
    margin-bottom: 15px;
  }

  /* Añadir estilos para los botones como lista */
  div {
    display: flex;
    flex-direction: column; /* Botones uno debajo del otro */
    gap: 10px; /* Espaciado entre los botones */
    align-items: center; /* Centrar botones horizontalmente */
  }

  button {
    padding: 10px 60px;
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


// Botón para las actividades 
//no lo uso
export const ActivityButton = styled.button`
  display: block;
  width: 50%;
  margin: 7px auto;
  
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

    a {
    color: white;
    text-decoration: none;
  }
`;

// Botones de navegación
export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 60px;
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
