import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormWrapper,
  Title,
  Form,
  Label,
  Input,
  Button,
  Circle,
  PopupMessage,
  EyeIcon // Importa el nuevo estilo para el ícono
} from '../styles/LoginStyles';


function Login() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Estado para mostrar/ocultar la contraseña
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !contrasena) {
      setError('Por favor, rellena todos los campos');
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.0.20:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id_estudiante', data.id_estudiante); // Guarda el id_estudiante
// Redirige según el rol del usuario
        if (data.rol === 'Docente') {
          navigate('/docente-crud'); // Ruta para Docente
        } else {
          navigate('/home'); // Ruta para Estudiantes
        }
      } else {
        setError(data.message); // Muestra el mensaje de error del servidor
        setShowPopup(true);
      }
    } catch (error) {
      setError('Error en la solicitud al servidor');
      setShowPopup(true);
    }
  };

  return (
    <Container>
      <Circle color="#3766e1" />
      <Circle color="#ff8126" />

      <FormWrapper>
        <Title>Iniciar Sesión</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Nombre(s):</Label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu(s) nombre(s)"
          />

          <Label>Apellidos:</Label>
          <Input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ingresa tus apellidos"
          />
<Label>Contraseña:</Label>
<div style={{ position: 'relative' }}>
  <Input
    type={showPassword ? 'text' : 'password'}  // Alternar entre texto y contraseña
    value={contrasena}
    onChange={(e) => setContrasena(e.target.value)}
    placeholder="Ingresa tu contraseña"
    style={{ paddingRight: '107px' }}  // Añadir espacio para el ícono
  />
  {/* Ícono del ojo para mostrar/ocultar contraseña */}
  <EyeIcon
    onClick={toggleShowPassword}
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#333',
    }}
  >
    {showPassword ? '👁️' : '🙈'}
  </EyeIcon>
</div>

          <Button type="submit">Iniciar Sesión</Button>
        </Form>
      </FormWrapper>

      {showPopup && (
        <PopupMessage>
          {error}
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </PopupMessage>
      )}
    </Container>
  );
}

export default Login;
