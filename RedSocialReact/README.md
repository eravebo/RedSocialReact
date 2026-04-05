# 🌐 Red Social - Taller Componentes React

Plantilla estática de red social convertida a **componentes de React.js**.

---

## ▶️ Cómo correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm start
```

Abre en: **http://localhost:3000**

---

## 📁 Estructura del proyecto

```
RedSocialReact/
├── public/
│   └── index.html
├── src/
│   ├── index.js                        ← Punto de entrada + UsuarioProvider
│   ├── App.js                          ← Layout de 3 columnas
│   ├── App.css
│   ├── context/
│   │   └── UsuarioContext.js           ← useContext: usuario logueado global
│   ├── datos/
│   │   └── publicaciones.js            ← Datos iniciales con IDs únicos
│   └── components/
│       ├── Navbar.js
│       ├── PerfilLateral.js
│       ├── Acordeon.js
│       ├── FeedPublicaciones.js        ← useState + useEffect del feed
│       ├── Publicacion.js              ← Post estilo Facebook completo
│       ├── Publicacion.css             ← Estilos fieles al diseño de FB
│       ├── ColumnaLateral.js
│       └── Footer.js
└── package.json
```

---

## 🧩 Parte 1 — Componentes básicos

| Componente | Descripción |
|---|---|
| `Navbar` | Barra superior responsive, menú móvil con `useState` |
| `PerfilLateral` | Foto, datos, intereses, alerta descartable |
| `Acordeon` | Secciones expandibles con `useState` |
| `FeedPublicaciones` | Caja de publicar + lista de posts |
| `Publicacion` | Tarjeta reutilizable con props |
| `ColumnaLateral` | Eventos, solicitudes de amistad |
| `Footer` | Pie de página |

---

## ⚛️ Parte 2 — Hooks: useState · useEffect · useContext

### Bugs corregidos
- ❌ **Antes:** `key={index}` → usar el índice del array como ID provoca
  re-renders incorrectos cuando el orden de la lista cambia.
- ✅ **Ahora:** cada post tiene `id: 'post-a1b2c3'` (string único), y se
  usa `key={pub.id}` en el `.map()`.

### useState
| Dónde | Qué controla |
|---|---|
| `FeedPublicaciones` | Lista de posts, texto del nuevo post, notificación toast |
| `Publicacion` | Like activo, animación de like, sección de comentarios visible, modal compartir, texto del comentario |
| `Comentario` | Respuestas visibles, campo de respuesta activo, texto de respuesta |
| `Navbar` | Menú móvil abierto/cerrado |
| `PerfilLateral` | Alerta visible/oculta |

### useEffect
| Dónde | Qué hace |
|---|---|
| `FeedPublicaciones` | Timer para ocultar el toast de notificación; limpia con `return () => clearTimeout(timer)` |
| `Publicacion` | Hace `console.log` didáctico cuando cambia el like de un post |
| `Publicacion` | Enfoca el `<textarea>` de comentarios al abrirse |
| `Comentario` | Enfoca el `<input>` de respuesta cuando se activa |

### useContext
| Dónde | Qué aporta |
|---|---|
| `UsuarioContext.js` | Crea el contexto y el `UsuarioProvider` |
| `index.js` | Envuelve `<App>` en `<UsuarioProvider>` |
| `FeedPublicaciones` | Lee `usuarioActual` para crear posts nuevos |
| `Publicacion` | Lee `usuarioActual` para comentar y en el modal de compartir |
| `Comentario` | Lee `usuarioActual` para crear respuestas |

### Funcionalidades del post estilo Facebook
- 👍 Like con animación y contador en tiempo real
- 💬 Sección de comentarios expandible (Enter para enviar)
- ↩️ Responder comentarios con input anidado
- ❤️ Like a comentarios y respuestas
- 🔁 Compartir con modal y mensaje personalizado
- 📢 Toast de notificación que desaparece solo
- ✏️ Publicar nuevo post en el feed
- 🌐 Ícono de privacidad por post (público / amigos / solo yo)
