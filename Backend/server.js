const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const app = express();
const port = 3001;


// Clave secreta para JWT
const SECRET_KEY = 'tu_secreto_super_seguro';

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'colegiocrma'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para registrar las solicitudes entrantes
app.use((req, res, next) => {
  console.log(`Nueva solicitud: ${req.method} ${req.url}`);
  next(); // Continúa con la siguiente ruta o middleware
});

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    const tokenPart = token.split(' ')[1]; // Quitamos "Bearer" del token

    jwt.verify(tokenPart, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Guardamos los datos del usuario en la request para usar después
        req.user = decoded;
        next();
    });
};


// Ruta para inicio de sesión
app.post('/login', (req, res) => {
    const { nombre, apellido, contrasena } = req.body;

    // Consulta SQL para buscar al estudiante por nombre y apellido
    const query = 'SELECT * FROM estudiantes WHERE nombre = ? AND apellido = ?';
    db.execute(query, [nombre, apellido], (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }

        // Si no se encuentra el usuario
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const estudiante = results[0];

        // Comparar contraseñas
        if (contrasena === estudiante.contrasena) {
            // Generar token JWT
            const token = jwt.sign(
                { 
                  id_estudiante: estudiante.id_estudiante, 
                  nombre: estudiante.nombre, 
                  apellido: estudiante.apellido,
                  rol: estudiante.rol // Incluye el rol en el token 
                },
                SECRET_KEY,
                { expiresIn: '3h' }
              );
              
        // Devuelve el token y el id_estudiante
        return res.status(200).json({ message: 'Inicio de sesión exitoso', 
          token, 
          id_estudiante: estudiante.id_estudiante,
          rol: estudiante.rol 
        });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });
});

// Ruta protegida de ejemplo (Home)
app.get('/home', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Acceso autorizado a la página protegida' });
});

// Ruta para obtener las opciones de respuesta
app.get('/api/getOptions', (req, res) => {
    const query = 'SELECT id_opcion, id_respuesta, contenido_opcion FROM opciones';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching options:', err);
        return res.status(500).json({ error: 'Error fetching options' });
      }
      const options = results.reduce((acc, row) => {
        if (!acc[row.id_respuesta]) acc[row.id_respuesta] = [];
        acc[row.id_respuesta].push({
          id: row.id_opcion,
          value: row.contenido_opcion,
          label: row.contenido_opcion
        });
        return acc;
      }, {});
      res.json(options);  // Devuelve las opciones agrupadas por id_respuesta
    });
  });  

  //Unir imagenes get Answers
  app.get('/api/getCorrectAnswers', (req, res) => {
    const query = `
      SELECT r.id_respuesta, r.respuesta_correcta AS text, ri.imageId
      FROM respuestas r
      JOIN respuesta_imagen ri ON r.id_respuesta = ri.id_respuesta
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener respuestas correctas:', err);
        return res.status(500).json({ error: 'Error al obtener respuestas correctas' });
      }
      res.json(results);
    });
  });
  
  app.get('/api/getAllAnswers', (req, res) => {
    console.log("Petición recibida en /api/getAllAnswers");
  
    const query = `
        SELECT id_respuesta, respuesta_correcta
        FROM respuestas
        WHERE id_respuesta >= 79 -- Filtra desde el id_respuesta donde comienzan las respuestas del crucigrama
    `;
  
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener respuestas:', err);
            return res.status(500).json({ error: 'Error al obtener respuestas' });
        }
  
        // Estructurar los resultados en un formato clave-valor
        const formattedResults = results.reduce((acc, row, index) => {
            acc[index] = row.respuesta_correcta;
            return acc;
        }, {});
  
        console.log("Respuestas formateadas:", formattedResults);
        res.json(formattedResults); // Devuelve las respuestas formateadas
    });
  });
  

  //Guardar las respuestas
  app.post('/api/saveResults', (req, res) => {
    const { id_estudiante, id_actividad, respuestas_correctas, calificacion_total, promedio } = req.body;
  
    // Consulta SQL para insertar los datos en la tabla Resultados, incluyendo el promedio
    const query = 'INSERT INTO Resultados (id_estudiante, id_actividad, respuestas_correctas, calificacion_total, promedio) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [id_estudiante, id_actividad, respuestas_correctas, calificacion_total, promedio], (err, result) => {
      if (err) {
        console.error('Error al guardar los resultados:', err);
        return res.status(500).send('Error al guardar los resultados');  // Mensaje de error como texto
      }
  
      res.status(200).send('Resultados guardados exitosamente');
    });
  });
  

// Ruta para obtener detalles del estudiante
app.get('/api/estudiantes/:id_estudiante', (req, res) => {
    const { id_estudiante } = req.params;

    // Consulta para obtener el promedio del estudiante
    const queryPromedio = `
        SELECT AVG(r.calificacion_total) AS promedio_final
        FROM resultados r
        WHERE r.id_estudiante = ?;
    `;

    // Consulta para obtener las actividades agrupadas por subtemas
    const queryActividades = `
        SELECT 
            a.id_actividad, 
            a.tipo, 
            a.description, 
            r.calificacion_total
        FROM actividades a
        LEFT JOIN resultados r ON a.id_actividad = r.id_actividad AND r.id_estudiante = ?
    `;

    db.query(queryPromedio, [id_estudiante], (err, promedioResult) => {
        if (err) {
            console.error('Error al calcular el promedio:', err);
            return res.status(500).json({ error: 'Error al calcular el promedio' });
        }

        const promedioFinal = promedioResult[0]?.promedio_final || 0;

        db.query(queryActividades, [id_estudiante], (err, actividadesResult) => {
            if (err) {
                console.error('Error al obtener actividades:', err);
                return res.status(500).json({ error: 'Error al obtener actividades' });
            }

            const subtemas = {
                'Subtema 1': [],
                'Subtema 2': [],
                'Subtema 3': [],
                'Subtema 4': [],
                'Subtema 5': [],
                'Subtema 6': []
            };

            // Agrupa las actividades por subtemas y distingue completadas de faltantes
            actividadesResult.forEach((actividad) => {
                let subtema = '';
                if (actividad.id_actividad >= 1 && actividad.id_actividad <= 3) subtema = 'Subtema 1';
                else if (actividad.id_actividad >= 4 && actividad.id_actividad <= 6) subtema = 'Subtema 2';
                else if (actividad.id_actividad >= 7 && actividad.id_actividad <= 9) subtema = 'Subtema 3';
                else if (actividad.id_actividad >= 10 && actividad.id_actividad <= 12) subtema = 'Subtema 4';
                else if (actividad.id_actividad >= 13 && actividad.id_actividad <= 15) subtema = 'Subtema 5';
                else if (actividad.id_actividad >= 16 && actividad.id_actividad <= 18) subtema = 'Subtema 6';

                subtemas[subtema].push({
                    id_actividad: actividad.id_actividad,
                    tipo: actividad.tipo,
                    description: actividad.description,
                    calificacion: actividad.calificacion_total || null // Calificación si completada
                });
            });

            res.status(200).json({
                promedioFinal,
                subtemas
            });
        });
    });
});

//Ruta para agregar estudiantes
app.post('/api/estudiantes', (req, res) => {
  const { nombre, apellido, contrasena } = req.body;

  // Validación de entrada
  if (!nombre || !apellido || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = `
      INSERT INTO estudiantes (nombre, apellido, contrasena) 
      VALUES (?, ?, ?);
  `;

  db.query(query, [nombre, apellido, contrasena], (err, result) => {
    if (err) {
      console.error('Error al agregar estudiante:', err);
      return res.status(500).json({ error: 'Error al agregar estudiante' });
    }

    // Devolver todos los datos del estudiante agregado
    res.status(200).json({
      message: 'Estudiante agregado exitosamente',
      id: result.insertId,
      nombre,
      apellido,
      contrasena, // Si no quieres devolver la contraseña, elimínala aquí
    });
  });
});


// Ruta para obtener todos los estudiantes
app.get('/api/estudiantes', (req, res) => {
  const query = `
    SELECT 
      e.id_estudiante,
      e.nombre,
      e.apellido,
      r.id_actividad,
      a.description,
      r.promedio
    FROM estudiantes e
    LEFT JOIN resultados r ON e.id_estudiante = r.id_estudiante
    LEFT JOIN actividades a ON r.id_actividad = a.id_actividad
    ORDER BY e.id_estudiante, r.id_actividad;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener estudiantes:', err);
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }

    // Procesar los datos para agrupar actividades por estudiante
    const estudiantesMap = {};

    results.forEach((row) => {
      const estudianteId = row.id_estudiante;

      if (!estudiantesMap[estudianteId]) {
        estudiantesMap[estudianteId] = {
          id_estudiante: estudianteId,
          nombre: row.nombre,
          apellido: row.apellido,
          actividades: [],
        };
      }

      if (row.id_actividad) {
        estudiantesMap[estudianteId].actividades.push({
          id_actividad: row.id_actividad,
          descripcion: row.description,
          promedio: row.promedio,
        });
      }
    });

    const estudiantes = Object.values(estudiantesMap);

    res.json(estudiantes);
  });
});




//Ruta para eliminar estudiantes
app.delete('/api/estudiantes/:id', (req, res) => {
  const idEstudiante = req.params.id;

  // Eliminar filas relacionadas en la tabla 'resultados'
  const deleteResultadosQuery = 'DELETE FROM resultados WHERE id_estudiante = ?';
  db.query(deleteResultadosQuery, [idEstudiante], (err) => {
    if (err) {
      console.error('Error al eliminar resultados relacionados:', err);
      return res.status(500).json({ error: 'Error al eliminar resultados relacionados' });
    }

    // Después, elimina el estudiante
    const deleteEstudianteQuery = 'DELETE FROM estudiantes WHERE id_estudiante = ?';
    db.query(deleteEstudianteQuery, [idEstudiante], (err) => {
      if (err) {
        console.error('Error al eliminar estudiante:', err);
        return res.status(500).json({ error: 'Error al eliminar estudiante' });
      }

      res.json({ message: 'Estudiante eliminado exitosamente' });
    });
  });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

