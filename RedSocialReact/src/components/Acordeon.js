import React, { useState } from 'react';

function Acordeon() {
  const [abierto, setAbierto] = useState(null);

  const toggle = (id) => {
    setAbierto(abierto === id ? null : id);
  };

  return (
    <div className="w3-card w3-round">
      <div className="w3-white">

        {/* Sección: Mis Grupos */}
        <button
          onClick={() => toggle('grupos')}
          className={`w3-button w3-block w3-left-align ${abierto === 'grupos' ? 'w3-theme-d1' : 'w3-theme-l1'}`}
        >
          <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> Mis Grupos
        </button>
        {abierto === 'grupos' && (
          <div className="w3-container">
            <p>Contenido de Mis Grupos...</p>
          </div>
        )}

        {/* Sección: Mis Eventos */}
        <button
          onClick={() => toggle('eventos')}
          className={`w3-button w3-block w3-left-align ${abierto === 'eventos' ? 'w3-theme-d1' : 'w3-theme-l1'}`}
        >
          <i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> Mis Eventos
        </button>
        {abierto === 'eventos' && (
          <div className="w3-container">
            <p>Contenido de Mis Eventos...</p>
          </div>
        )}

        {/* Sección: Mis Fotos */}
        <button
          onClick={() => toggle('fotos')}
          className={`w3-button w3-block w3-left-align ${abierto === 'fotos' ? 'w3-theme-d1' : 'w3-theme-l1'}`}
        >
          <i className="fa fa-users fa-fw w3-margin-right"></i> Mis Fotos
        </button>
        {abierto === 'fotos' && (
          <div className="w3-container">
            <div className="w3-row-padding">
              <br />
              {[
                'https://www.w3schools.com/w3images/lights.jpg',
                'https://www.w3schools.com/w3images/nature.jpg',
                'https://www.w3schools.com/w3images/mountains.jpg',
                'https://www.w3schools.com/w3images/forest.jpg',
                'https://www.w3schools.com/w3images/nature.jpg',
                'https://www.w3schools.com/w3images/snow.jpg',
              ].map((src, i) => (
                <div key={i} className="w3-half">
                  <img src={src} style={{ width: '100%' }} className="w3-margin-bottom" alt={`Foto ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Acordeon;
