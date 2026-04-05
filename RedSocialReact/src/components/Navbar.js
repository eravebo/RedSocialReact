import React, { useState } from 'react';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      {/* Navbar principal */}
      <div className="w3-top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">

          {/* Botón hamburguesa para móvil */}
          <button
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={toggleMenu}
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* Logo */}
          <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
            <i className="fa fa-home w3-margin-right"></i>Logo
          </a>

          {/* Íconos de navegación */}
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Noticias">
            <i className="fa fa-globe"></i>
          </a>
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Configuración de cuenta">
            <i className="fa fa-user"></i>
          </a>
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Mensajes">
            <i className="fa fa-envelope"></i>
          </a>

          {/* Dropdown Notificaciones */}
          <div className="w3-dropdown-hover w3-hide-small">
            <button className="w3-button w3-padding-large" title="Notificaciones">
              <i className="fa fa-bell"></i>
              <span className="w3-badge w3-right w3-small w3-green">3</span>
            </button>
            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{ width: '300px' }}>
              <a href="#" className="w3-bar-item w3-button">Nueva solicitud de amistad</a>
              <a href="#" className="w3-bar-item w3-button">John Doe publicó en tu muro</a>
              <a href="#" className="w3-bar-item w3-button">Jane le gusta tu publicación</a>
            </div>
          </div>

          {/* Avatar usuario */}
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Mi Cuenta">
            <img
              src="https://www.w3schools.com//w3images/avatar2.png"
              className="w3-circle"
              style={{ height: '23px', width: '23px' }}
              alt="Avatar"
            />
          </a>

        </div>
      </div>

      {/* Navbar para pantallas pequeñas */}
      <div
        id="navDemo"
        className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${menuAbierto ? 'w3-show' : 'w3-hide'}`}
      >
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Enlace 1</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Enlace 2</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Enlace 3</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Mi Perfil</a>
      </div>
    </>
  );
}

export default Navbar;
