import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Contenedor general
export const Container = styled.div`
  padding: 20px;
  background-color: #f4f6f9; /* Fondo más claro */
  min-height: 100vh;
`;

// Contenedor de la tabla
export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Para manejo responsivo */
`;

// Título
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top:20px;
`;

export const Title = styled.h1`
  flex-grow: 1; /* Permite que el título ocupe espacio disponible */
  font-size: 26px;
  padding-left: 260px;
  color: #333;
  font-weight: bold;
  text-align: center; /* Asegura que el texto del título esté alineado a la izquierda */
  margin-right: 10px; /* Añade espacio entre el título y el botón */
`;

export const AddButton = styled.button`
  flex-shrink: 0; /* Evita que el botón se reduzca demasiado */
  width: 20%; /* El botón ocupará exactamente el 30% del ancho */
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center; /* Centra el texto del botón */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Tabla estilizada
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    border: 1px solid #ddd;
    padding: 15px;
    vertical-align: middle;
  }

  th {
    background-color: #4142b4; /* Azul para encabezado */
    color: white;
    font-weight: bold;
  }

  td {
    background-color: #ffffff;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f2f6fc; /* Fondo alternado */
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    background: #ffffff;
    border-radius: 5px;
    padding: 5px;
    margin: 3px 0;
    font-size: 14px;
    color: #555;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

// Botones de acción
export const ActionButton = styled.button`
  background-color: ${(props) => props.color || "#007bff"};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#0056b3"};
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #dc3545;
    padding: 10px 20px ;
    margin-bottom: 10px;
  &:hover {
    background-color: #c82333;
  }
`;

export const EditButton = styled(ActionButton)`
  background-color: #ffc107;
  color: black;
  &:hover {
    background-color: #e0a800;
  }
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

// Input
export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 8px 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;
