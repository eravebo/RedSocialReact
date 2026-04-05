import React from 'react';
import Navbar from './components/Navbar';
import PerfilLateral from './components/PerfilLateral';
import FeedPublicaciones from './components/FeedPublicaciones';
import ColumnaLateral from './components/ColumnaLateral';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />

      {/* Contenedor principal */}
      <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
        <div className="w3-row">

          {/* Columna Izquierda */}
          <div className="w3-col m3">
            <PerfilLateral />
          </div>

          {/* Columna Central */}
          <div className="w3-col m7">
            <FeedPublicaciones />
          </div>

          {/* Columna Derecha */}
          <div className="w3-col m2">
            <ColumnaLateral />
          </div>

        </div>
      </div>

      <br />
      <Footer />
    </div>
  );
}

export default App;
