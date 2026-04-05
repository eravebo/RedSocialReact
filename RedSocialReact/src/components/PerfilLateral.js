import React, { useState } from 'react';
import Acordeon from './Acordeon';

function PerfilLateral() {
  const [alertaVisible, setAlertaVisible] = useState(true);

  return (
    <>
      {/* Tarjeta de Perfil */}
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <h4 className="w3-center">Mi Perfil</h4>
          <p className="w3-center">
            <img
              src="https://www.w3schools.com/w3images/avatar3.png"
              className="w3-circle"
              style={{ height: '106px', width: '106px' }}
              alt="Avatar"
            />
          </p>
          <hr />
          <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Diseñadora, UI</p>
          <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> Londres, UK</p>
          <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> Abril 1, 1988</p>
        </div>
      </div>
      <br />

      {/* Acordeón */}
      <Acordeon />
      <br />

      {/* Intereses */}
      <div className="w3-card w3-round w3-white w3-hide-small">
        <div className="w3-container">
          <p>Intereses</p>
          <p>
            <span className="w3-tag w3-small w3-theme-d5">Noticias</span>{' '}
            <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>{' '}
            <span className="w3-tag w3-small w3-theme-d3">Etiquetas</span>{' '}
            <span className="w3-tag w3-small w3-theme-d2">Juegos</span>{' '}
            <span className="w3-tag w3-small w3-theme-d1">Amigos</span>{' '}
            <span className="w3-tag w3-small w3-theme">Juegos</span>{' '}
            <span className="w3-tag w3-small w3-theme-l1">Amigos</span>{' '}
            <span className="w3-tag w3-small w3-theme-l2">Comida</span>{' '}
            <span className="w3-tag w3-small w3-theme-l3">Diseño</span>{' '}
            <span className="w3-tag w3-small w3-theme-l4">Arte</span>{' '}
            <span className="w3-tag w3-small w3-theme-l5">Fotos</span>
          </p>
        </div>
      </div>
      <br />

      {/* Alerta */}
      {alertaVisible && (
        <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
          <span
            onClick={() => setAlertaVisible(false)}
            className="w3-button w3-theme-l3 w3-display-topright"
          >
            <i className="fa fa-remove"></i>
          </span>
          <p><strong>¡Oye!</strong></p>
          <p>La gente está viendo tu perfil. Descubre quién.</p>
        </div>
      )}
    </>
  );
}

export default PerfilLateral;
