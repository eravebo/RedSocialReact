import React, { useState } from 'react';

function ColumnaLateral() {
  const [solicitudVisible, setSolicitudVisible] = useState(true);

  return (
    <>
      {/* Próximos Eventos */}
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <p>Próximos Eventos:</p>
          <img
            src="https://www.w3schools.com/w3images/forest.jpg"
            alt="Bosque"
            style={{ width: '100%' }}
          />
          <p><strong>Vacaciones</strong></p>
          <p>Viernes 15:00</p>
          <p>
            <button className="w3-button w3-block w3-theme-l4">Info</button>
          </p>
        </div>
      </div>
      <br />

      {/* Solicitud de Amistad */}
      {solicitudVisible && (
        <div className="w3-card w3-round w3-white w3-center">
          <div className="w3-container">
            <p>Solicitud de Amistad</p>
            <img
              src="https://www.w3schools.com/w3images/avatar6.png"
              alt="Avatar"
              style={{ width: '50%' }}
            />
            <br />
            <span>Jane Doe</span>
            <div className="w3-row w3-opacity">
              <div className="w3-half">
                <button
                  className="w3-button w3-block w3-green w3-section"
                  title="Aceptar"
                  onClick={() => setSolicitudVisible(false)}
                >
                  <i className="fa fa-check"></i>
                </button>
              </div>
              <div className="w3-half">
                <button
                  className="w3-button w3-block w3-red w3-section"
                  title="Rechazar"
                  onClick={() => setSolicitudVisible(false)}
                >
                  <i className="fa fa-remove"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />

      {/* Publicidad */}
      <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
        <p>ANUNCIOS</p>
      </div>
      <br />

      {/* Decorativo */}
      <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
        <p><i className="fa fa-bug w3-xxlarge"></i></p>
      </div>
    </>
  );
}

export default ColumnaLateral;
