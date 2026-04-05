// datos/publicaciones.js
// IDs generados con crypto.randomUUID() simulado para garantizar unicidad
// Se usan strings únicos, NO índices del array (ese era el bug anterior)

const publicacionesIniciales = [
  {
    id: 'post-a1b2c3',
    autor: {
      nombre: 'John Doe',
      avatar: 'https://www.w3schools.com/w3images/avatar2.png',
      trabajo: 'Desarrollador en Meta',
    },
    tiempo: 'Hace 1 minuto',
    privacidad: 'public', // public | friends | only_me
    contenido:
      '🌅 ¡Increíble atardecer hoy! A veces hay que pausar y apreciar lo que nos rodea. ¿Cuándo fue la última vez que viste un amanecer o atardecer y lo disfrutaste de verdad?',
    imagenes: [
      'https://www.w3schools.com/w3images/lights.jpg',
      'https://www.w3schools.com/w3images/nature.jpg',
    ],
    likes: 142,
    compartidos: 18,
    comentarios: [
      {
        id: 'com-x1y2z3',
        autorNombre: 'Jane Doe',
        autorAvatar: 'https://www.w3schools.com/w3images/avatar5.png',
        texto: '¡Qué hermoso! Me encanta 😍',
        likes: 5,
        likeado: false,
        tiempo: 'Hace 30 segundos',
        respuestas: [],
      },
    ],
  },
  {
    id: 'post-d4e5f6',
    autor: {
      nombre: 'Jane Doe',
      avatar: 'https://www.w3schools.com/w3images/avatar5.png',
      trabajo: 'Diseñadora UX en Google',
    },
    tiempo: 'Hace 16 minutos',
    privacidad: 'friends',
    contenido:
      '💡 Tip del día para diseñadores: El espacio en blanco no es espacio desperdiciado. Es respiración para tu diseño. Dale a tus elementos room to breathe y verás cómo todo mejora. #UX #Design #Tips',
    imagenes: [],
    likes: 89,
    compartidos: 34,
    comentarios: [],
  },
  {
    id: 'post-g7h8i9',
    autor: {
      nombre: 'Angie Jane',
      avatar: 'https://www.w3schools.com/w3images/avatar6.png',
      trabajo: 'Fotógrafa profesional',
    },
    tiempo: 'Hace 32 minutos',
    privacidad: 'public',
    contenido: '📸 ¿Han visto esto? La naturaleza nunca deja de sorprenderme. Tomé esta foto esta mañana en el parque. Sin filtros, sin edición. Solo la magia del momento.',
    imagenes: ['https://www.w3schools.com/w3images/nature.jpg'],
    likes: 217,
    compartidos: 52,
    comentarios: [
      {
        id: 'com-j1k2l3',
        autorNombre: 'John Doe',
        autorAvatar: 'https://www.w3schools.com/w3images/avatar2.png',
        texto: '¡Impresionante foto Angie! 🔥',
        likes: 12,
        likeado: false,
        tiempo: 'Hace 20 minutos',
        respuestas: [
          {
            id: 'rep-m1n2o3',
            autorNombre: 'Angie Jane',
            autorAvatar: 'https://www.w3schools.com/w3images/avatar6.png',
            texto: 'Gracias John! Fue un momento mágico 🙏',
            likes: 3,
            likeado: false,
            tiempo: 'Hace 15 minutos',
          },
        ],
      },
    ],
  },
];

export default publicacionesIniciales;
