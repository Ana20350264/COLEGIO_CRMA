import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Subtema1Page from './pages/Subtema1Page'; // Importa las demás páginas
import Subtema2Page from './pages/Subtema2Page';
import Subtema3Page from './pages/Subtema3Page'; 
import Subtema4Page from './pages/Subtema4Page'; 
import Subtema5Page from './pages/Subtema5Page'; 
import Subtema6Page from './pages/Subtema6Page'; 
import Crucigrama1 from './pages/juegos/Crucigrama1'; 
import Crucigrama2 from './pages/juegos/Crucigrama2'; 
import Crucigrama3 from './pages/juegos/Crucigrama3'; 
import Crucigrama4 from './pages/juegos/Crucigrama4'; 
import Crucigrama5 from './pages/juegos/Crucigrama5'; 
import Crucigrama6 from './pages/juegos/Crucigrama6'; 
import Unir1 from './pages/juegos/Unir1'; 
import Unir2 from './pages/juegos/Unir2'; 
import Unir3 from './pages/juegos/Unir3'; 
import Unir4 from './pages/juegos/Unir4'; 
import Unir5 from './pages/juegos/Unir5'; 
import Unir6 from './pages/juegos/Unir6'; 
import Oracion1 from './pages/juegos/Oracion1'; 
import Oracion2 from './pages/juegos/Oracion2'; 
import Oracion3 from './pages/juegos/Oracion3'; 
import Oracion4 from './pages/juegos/Oracion4'; 
import Oracion5 from './pages/juegos/Oracion5'; 
import Oracion6 from './pages/juegos/Oracion6'; 
import SobreEscuelaPage from './pages/SobreEscuelaPage';
import PrivateRoute from './components/PrivateRoute'; // Asegúrate de importar PrivateRoute
import DocenteCrud from './pages/DocenteCrud'; // Importa el CRUD del docente

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Ruta protegida */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/subtema1" 
          element={
            <PrivateRoute>
              <Subtema1Page />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/subtema2" 
          element={
            <PrivateRoute>
              <Subtema2Page />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/subtema3" 
          element={
            <PrivateRoute>
              <Subtema3Page />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/subtema4" 
          element={
            <PrivateRoute>
              <Subtema4Page />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/subtema5" 
          element={
            <PrivateRoute>
              <Subtema5Page />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/subtema6" 
          element={
            <PrivateRoute>
              <Subtema6Page />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/sobreescuela" 
          element={
            <PrivateRoute>
              <SobreEscuelaPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/crucigrama1" 
          element={
            <PrivateRoute>
              <Crucigrama1 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/crucigrama2" 
          element={
            <PrivateRoute>
              <Crucigrama2 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/crucigrama3" 
          element={
            <PrivateRoute>
              <Crucigrama3 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/crucigrama4" 
          element={
            <PrivateRoute>
              <Crucigrama4 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/crucigrama5" 
          element={
            <PrivateRoute>
              <Crucigrama5 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/crucigrama6" 
          element={
            <PrivateRoute>
              <Crucigrama6 />
            </PrivateRoute>
          } 
        />

<Route 
          path="/unir1" 
          element={
            <PrivateRoute>
              <Unir1 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/unir2" 
          element={
            <PrivateRoute>
              <Unir2 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/unir3" 
          element={
            <PrivateRoute>
              <Unir3 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/unir4" 
          element={
            <PrivateRoute>
              <Unir4 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/unir5" 
          element={
            <PrivateRoute>
              <Unir5 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/unir6" 
          element={
            <PrivateRoute>
              <Unir6 />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/oracion1" 
          element={
            <PrivateRoute>
              <Oracion1 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/oracion2" 
          element={
            <PrivateRoute>
              <Oracion2 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/oracion3" 
          element={
            <PrivateRoute>
              <Oracion3 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/oracion4" 
          element={
            <PrivateRoute>
              <Oracion4 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/oracion5" 
          element={
            <PrivateRoute>
              <Oracion5 />
            </PrivateRoute>
          } 
        />
                <Route 
          path="/oracion6" 
          element={
            <PrivateRoute>
              <Oracion6 />
            </PrivateRoute>
          } 
        />

<Route 
    path="/docente-crud" 
    element={
      <PrivateRoute>
        <DocenteCrud />
      </PrivateRoute>
    } 
  />

      </Routes>
    </div>
  );
}

export default App;
