import React, { useState, useEffect } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import Publicacion from './Publicacion';
import publicacionesIniciales from '../datos/publicaciones';

function FeedPublicaciones() {
  const { usuarioActual } = useUsuario();

  // useState: lista de publicaciones (estado central del feed)
  const [publicaciones, setPublicaciones] = useState(publicacionesIniciales);
  const [textoNuevoPost, setTextoNuevoPost] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  // useEffect: ocultar notificación automáticamente tras 3 segundos
  useEffect(() => {
    if (notificacion) {
      const timer = setTimeout(() => setNotificacion(null), 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [notificacion]);

  // ── Publicar nuevo post ──────────────────────────────────────────────────
  const handlePublicar = () => {
    const texto = textoNuevoPost.trim();
    if (!texto) return;

    const nuevoPost = {
      // ID único: NO usamos índice del array (ese era el bug del taller)
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      autor: {
        nombre: usuarioActual.nombre,
        avatar: usuarioActual.avatar,
        trabajo: 'Usuario de la Red Social',
      },
      tiempo: 'Ahora mismo',
      privacidad: 'public',
      contenido: texto,
      imagenes: [],
      likes: 0,
      compartidos: 0,
      comentarios: [],
    };

    // Agregar al inicio del feed (como Facebook)
    setPublicaciones((prev) => [nuevoPost, ...prev]);
    setTextoNuevoPost('');
    setNotificacion('✅ ¡Publicación creada!');
  };

  // ── Like al post ─────────────────────────────────────────────────────────
  const handleLike = (postId) => {
    setPublicaciones((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: p.likeadoPorMi ? p.likes - 1 : p.likes + 1, likeadoPorMi: !p.likeadoPorMi }
          : p
      )
    );
  };

  // ── Compartir post ───────────────────────────────────────────────────────
  const handleCompartir = (postId, mensaje) => {
    setPublicaciones((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, compartidos: p.compartidos + 1 } : p
      )
    );
    setNotificacion(`🔁 Publicación compartida${mensaje ? ` con el mensaje: "${mensaje}"` : ''}!`);
  };

  // ── Agregar comentario ───────────────────────────────────────────────────
  const handleAgregarComentario = (postId, nuevoComentario) => {
    setPublicaciones((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comentarios: [...p.comentarios, nuevoComentario] }
          : p
      )
    );
  };

  // ── Like a comentario ────────────────────────────────────────────────────
  const handleLikeComentario = (postId, comentarioId) => {
    setPublicaciones((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comentarios: p.comentarios.map((c) =>
            c.id === comentarioId
              ? { ...c, likeado: !c.likeado, likes: c.likeado ? c.likes - 1 : c.likes + 1 }
              : c
          ),
        };
      })
    );
  };

  // ── Agregar respuesta a comentario ───────────────────────────────────────
  const handleAgregarRespuesta = (postId, comentarioId, nuevaRespuesta) => {
    setPublicaciones((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comentarios: p.comentarios.map((c) =>
            c.id === comentarioId
              ? { ...c, respuestas: [...c.respuestas, nuevaRespuesta] }
              : c
          ),
        };
      })
    );
  };

  // ── Like a respuesta ─────────────────────────────────────────────────────
  const handleLikeRespuesta = (postId, comentarioId, respuestaId) => {
    setPublicaciones((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comentarios: p.comentarios.map((c) => {
            if (c.id !== comentarioId) return c;
            return {
              ...c,
              respuestas: c.respuestas.map((r) =>
                r.id === respuestaId
                  ? { ...r, likeado: !r.likeado, likes: r.likeado ? r.likes - 1 : r.likes + 1 }
                  : r
              ),
            };
          }),
        };
      })
    );
  };

  return (
    <div style={{ padding: '0 8px' }}>

      {/* ── Notificación toast ── */}
      {notificacion && (
        <div style={{
          background: '#1877F2',
          color: '#fff',
          padding: '10px 16px',
          borderRadius: '8px',
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
        }}>
          {notificacion}
        </div>
      )}

      {/* ── Caja de nuevo post ── */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        padding: '12px 16px',
        marginBottom: '16px',
        fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={usuarioActual.avatar}
            alt={usuarioActual.nombre}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <textarea
            value={textoNuevoPost}
            onChange={(e) => setTextoNuevoPost(e.target.value)}
            placeholder={`¿Qué estás pensando, ${usuarioActual.nombre}?`}
            style={{
              flex: 1,
              border: 'none',
              background: '#F0F2F5',
              borderRadius: '20px',
              padding: '10px 16px',
              fontSize: '15px',
              fontFamily: 'inherit',
              resize: 'none',
              outline: 'none',
              cursor: 'text',
            }}
            rows={2}
          />
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #E4E6EB', margin: '0 0 10px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handlePublicar}
            disabled={!textoNuevoPost.trim()}
            style={{
              background: textoNuevoPost.trim() ? '#1877F2' : '#E4E6EB',
              color: textoNuevoPost.trim() ? '#fff' : '#BCC0C4',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 24px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: textoNuevoPost.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
          >
            Publicar
          </button>
        </div>
      </div>

      {/* ── Lista de publicaciones ── */}
      {publicaciones.map((pub) => (
        <Publicacion
          key={pub.id}
          post={pub}
          onLike={handleLike}
          onCompartir={handleCompartir}
          onAgregarComentario={handleAgregarComentario}
          onLikeComentario={handleLikeComentario}
          onAgregarRespuesta={handleAgregarRespuesta}
          onLikeRespuesta={handleLikeRespuesta}
        />
      ))}
    </div>
  );
}

export default FeedPublicaciones;
