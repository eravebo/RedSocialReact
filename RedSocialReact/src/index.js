import React from 'react';
import ReactDOM from 'react-dom/client';
import { UsuarioProvider } from './context/UsuarioContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* useContext: el Provider envuelve toda la app para que cualquier
        componente hijo pueda acceder al usuario logueado sin pasar props */}
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </React.StrictMode>
);
