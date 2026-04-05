import React, { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const UsuarioContext = createContext();

// 2. Proveedor del contexto
export function UsuarioProvider({ children }) {
  const [usuarioActual] = useState({
    id: 0,
    nombre: 'Yo (Tú)',
    avatar: 'https://www.w3schools.com/w3images/avatar3.png',
  });

  return (
    <UsuarioContext.Provider value={{ usuarioActual }}>
      {children}
    </UsuarioContext.Provider>
  );
}

// 3. Hook personalizado para consumir el contexto fácilmente
export function useUsuario() {
  return useContext(UsuarioContext);
}
