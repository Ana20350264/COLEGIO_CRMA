import React, { useState, useEffect } from 'react';
import {
  Container,
  TableContainer,
  StyledTable,
  DeleteButton,
  AddButton,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Title,
  HomeContainer,
  HeaderContainer,
} from '../styles/DocenteCrudStyles';
import Navbar from '../components/NavbarDocente';
import BASE_URL from '../config/apiConfig';

const DocenteCrud = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [newStudent, setNewStudent] = useState({ nombre: '', apellido: '', contrasena: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/home`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos obtenidos del backend:', data); // Log inicial de datos
  
        const estudiantesConPromedio = data.map((estudiante) => {
          const actividades = estudiante.actividades || [];
          console.log('Actividades del estudiante:', actividades); // Log de actividades por estudiante
  
          // Calcular promedio por subtema
          const subtemasPromedios = Array.from({ length: 6 }).map((_, subtemaIndex) => {
            const subtemaStart = subtemaIndex * 3 + 1;
            const subtemaEnd = subtemaStart + 3;
  
            const actividadesSubtema = actividades.filter(
              (actividad) =>
                actividad.id_actividad >= subtemaStart &&
                actividad.id_actividad < subtemaEnd
            );
  
            console.log(
              `Actividades del Subtema ${subtemaIndex + 1}:`,
              actividadesSubtema
            ); // Log actividades filtradas por subtema
  
            const uniqueActividades = removeDuplicates(actividadesSubtema);
            console.log(
              `Actividades únicas para Subtema ${subtemaIndex + 1}:`,
              uniqueActividades
            );
  
            // Validar si hay al menos 3 actividades
            if (uniqueActividades.length < 3) {
              console.warn(
                `El Subtema ${subtemaIndex + 1} tiene menos de 3 actividades realizadas. No se calculará el promedio.`
              );
              return 'N/A';
            }
  
            const totalPromedio = uniqueActividades.reduce((sum, actividad) => {
              const promedio = parseFloat(actividad.promedio);
              if (isNaN(promedio)) {
                console.warn(
                  `Actividad con promedio inválido (id_actividad: ${actividad.id_actividad}):`,
                  actividad
                );
                return sum; // Ignorar valores inválidos
              }
              console.log(
                `Promedio válido de la actividad ${actividad.id_actividad}:`,
                promedio
              );
              return sum + promedio;
            }, 0);
  
            console.log(
              `Suma total de promedios para Subtema ${subtemaIndex + 1}:`,
              totalPromedio
            );
  
            const promedioSubtema =
              (totalPromedio / uniqueActividades.length).toFixed(2);
  
            console.log(`Promedio para Subtema ${subtemaIndex + 1}:`, promedioSubtema);
  
            return promedioSubtema;
          });
  
          // Verificar si todos los subtemas tienen un promedio válido
          if (subtemasPromedios.some((promedio) => promedio === 'N/A')) {
            console.warn(
              `El estudiante ${estudiante.nombre} no tiene todos los subtemas con promedio. Promedio general no calculado.`
            );
            return { ...estudiante, promedio: 'N/A', subtemasPromedios };
          }
  
          // Calcular promedio general del estudiante
          const promedioTotal = (
            subtemasPromedios.reduce((sum, promedio) => sum + parseFloat(promedio), 0) /
            subtemasPromedios.length
          ).toFixed(2);
  
          console.log(`Promedio general del estudiante ${estudiante.nombre}:`, promedioTotal);
  
          return { ...estudiante, promedio: promedioTotal, subtemasPromedios };
        });
  
        setEstudiantes(estudiantesConPromedio);
      })
      .catch((error) =>
        console.error('Error al obtener estudiantes:', error)
      );
  }, []);
  
    // Eliminar duplicados en actividades
    const removeDuplicates = (activities) => {
      const uniqueActivities = new Set();
      return activities.filter((activity) => {
        // Usar `id_actividad` para identificar duplicados en lugar de `descripcion`
        if (uniqueActivities.has(activity.id_actividad)) {
          return false;
        }
        uniqueActivities.add(activity.id_actividad);
        return true;
      });
    };
  
    const eliminarEstudiante = (id) => {
      if (window.confirm('¿Deseas eliminar este estudiante?')) {
        fetch(`http://localhost:3001/api/estudiantes/${id}`, { method: 'DELETE' })
          .then(() => setEstudiantes(estudiantes.filter((e) => e.id_estudiante !== id)))
          .catch((error) => console.error('Error al eliminar estudiante:', error));
      }
    };
  
    const agregarEstudiante = () => {
      fetch('http://localhost:3001/api/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al agregar estudiante');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Respuesta del servidor:', data);
          if (!data.id) {
            throw new Error('La respuesta del servidor no contiene un ID válido');
          }
    
          // Agregar el nuevo estudiante al estado con actividades vacías
          setEstudiantes((prevEstudiantes) => [
            ...prevEstudiantes,
            {
              id_estudiante: data.id,
              nombre: data.nombre,
              apellido: data.apellido,
              actividades: [], // Se agrega actividades vacío por defecto
              subtemasPromedios: [], // Opcional: inicializa subtemasPromedios
            },
          ]);
    
          // Limpiar el formulario
          setNewStudent({ nombre: '', apellido: '', contrasena: '' });
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error al agregar estudiante:', error);
        });
    };
    
  
    return (
      <HomeContainer>
        <Navbar />
  
        <Container>
          <TableContainer>
            <HeaderContainer>
            <Title>Gestión de estudiantes 
            </Title>
            <AddButton onClick={() => setShowModal(true)}>Agregar nuevo estudiante</AddButton>
            </HeaderContainer>
            <StyledTable>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre Completo</th>
                  <th>Promedio General</th>
                  <th>Subtema 1</th>
                  <th>Subtema 2</th>
                  <th>Subtema 3</th>
                  <th>Subtema 4</th>
                  <th>Subtema 5</th>
                  <th>Subtema 6</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
  {estudiantes
    .filter((estudiante) => estudiante.id_estudiante !== 26) // Excluir al usuario con ID 26
    .map((estudiante, index) => (
      <tr key={estudiante.id_estudiante}>
        <td>{index + 1}</td>
        <td>{`${estudiante.nombre} ${estudiante.apellido}`}</td>
        <td>{estudiante.promedio}</td>
        {Array.from({ length: 6 }).map((_, subtemaIndex) => {
          const subtemaStart = subtemaIndex * 3 + 1;
          const subtemaEnd = subtemaStart + 3;

          const actividadesSubtema = estudiante.actividades?.filter(
            (actividad) =>
              actividad.id_actividad >= subtemaStart &&
              actividad.id_actividad < subtemaEnd
          ) || [];

          const uniqueActividades = removeDuplicates(actividadesSubtema);

          return (
            <td key={subtemaIndex}>
              <ul>
                {uniqueActividades.map((actividad) => (
                  <li key={actividad.id_actividad}>
                    {actividad.descripcion}: {actividad.promedio || 'Sin calificación'}
                  </li>
                ))}
                <li>
                  <strong>Promedio:</strong>{' '}
                  {estudiante.subtemasPromedios[subtemaIndex] || 'N/A'}
                </li>
              </ul>
            </td>
          );
        })}
        <td>
          <DeleteButton onClick={() => eliminarEstudiante(estudiante.id_estudiante)}>
            Eliminar
          </DeleteButton>
        </td>
      </tr>
    ))}
</tbody>

            </StyledTable>
          </TableContainer>
  
          {showModal && (
            <ModalOverlay>
              <ModalContent>
                <ModalCloseButton onClick={() => setShowModal(false)}>X</ModalCloseButton>
                <h2>Agregar Estudiante</h2>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newStudent.nombre}
                  onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={newStudent.apellido}
                  onChange={(e) => setNewStudent({ ...newStudent, apellido: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={newStudent.contrasena}
                  onChange={(e) => setNewStudent({ ...newStudent, contrasena: e.target.value })}
                />
                <button onClick={agregarEstudiante}>Agregar</button>
              </ModalContent>
            </ModalOverlay>
          )}
        </Container>
      </HomeContainer>
    );
  };
  
  export default DocenteCrud;
  