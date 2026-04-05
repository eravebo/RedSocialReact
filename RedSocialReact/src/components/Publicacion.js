import React, { useState, useEffect, useRef } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import './Publicacion.css';

// ── Ícono de privacidad ──────────────────────────────────────────────────────
function IconoPrivacidad({ tipo }) {
  if (tipo === 'friends') return <i className="fa fa-users" title="Amigos"></i>;
  if (tipo === 'only_me') return <i className="fa fa-lock" title="Solo yo"></i>;
  return <i className="fa fa-globe" title="Público"></i>;
}

// ── Componente de una Respuesta individual ───────────────────────────────────
function Respuesta({ respuesta, onLikeRespuesta }) {
  return (
    <div className="fb-comentario" style={{ marginBottom: '6px' }}>
      <img src={respuesta.autorAvatar} alt={respuesta.autorNombre} />
      <div>
        <div className="fb-comentario-burbuja">
          <div className="autor">{respuesta.autorNombre}</div>
          <div className="texto">{respuesta.texto}</div>
        </div>
        <div className="fb-comentario-acciones">
          <span
            className={respuesta.likeado ? 'liked-text' : ''}
            onClick={onLikeRespuesta}
          >
            Me gusta {respuesta.likes > 0 && `· ${respuesta.likes}`}
          </span>
          <span className="fb-comentario-tiempo">{respuesta.tiempo}</span>
        </div>
      </div>
    </div>
  );
}

// ── Componente de un Comentario individual ───────────────────────────────────
function Comentario({ comentario, postId, onLikeComentario, onAgregarRespuesta, onLikeRespuesta }) {
  const { usuarioActual } = useUsuario();
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);
  const [respondiendo, setRespondiendo] = useState(false);
  const [textoRespuesta, setTextoRespuesta] = useState('');
  const inputRef = useRef(null);

  // useEffect: enfocar el input cuando se abre el campo de respuesta
  useEffect(() => {
    if (respondiendo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [respondiendo]);

  const handleEnviarRespuesta = () => {
    const texto = textoRespuesta.trim();
    if (!texto) return;
    onAgregarRespuesta(postId, comentario.id, {
      id: `rep-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      autorNombre: usuarioActual.nombre,
      autorAvatar: usuarioActual.avatar,
      texto,
      likes: 0,
      likeado: false,
      tiempo: 'Ahora mismo',
    });
    setTextoRespuesta('');
    setRespondiendo(false);
    setMostrarRespuestas(true);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <div className="fb-comentario">
        <img src={comentario.autorAvatar} alt={comentario.autorNombre} />
        <div>
          <div className="fb-comentario-burbuja">
            <div className="autor">{comentario.autorNombre}</div>
            <div className="texto">{comentario.texto}</div>
          </div>
          <div className="fb-comentario-acciones">
            <span
              className={comentario.likeado ? 'liked-text' : ''}
              onClick={() => onLikeComentario(postId, comentario.id)}
            >
              Me gusta {comentario.likes > 0 && `· ${comentario.likes}`}
            </span>
            <span onClick={() => setRespondiendo(!respondiendo)}>Responder</span>
            <span className="fb-comentario-tiempo">{comentario.tiempo}</span>
          </div>
        </div>
      </div>

      {/* Botón ver/ocultar respuestas */}
      {comentario.respuestas.length > 0 && (
        <button
          className="fb-ver-respuestas"
          onClick={() => setMostrarRespuestas(!mostrarRespuestas)}
        >
          <i className="fa fa-reply"></i>
          {mostrarRespuestas
            ? 'Ocultar respuestas'
            : `Ver ${comentario.respuestas.length} respuesta${comentario.respuestas.length > 1 ? 's' : ''}`}
        </button>
      )}

      {mostrarRespuestas && (
        <div className="fb-respuestas">
          {comentario.respuestas.map((rep) => (
            <Respuesta
              key={rep.id}
              respuesta={rep}
              onLikeRespuesta={() => onLikeRespuesta(postId, comentario.id, rep.id)}
            />
          ))}
        </div>
      )}

      {/* Input de respuesta */}
      {respondiendo && (
        <div className="fb-respuesta-input-row">
          <img src={usuarioActual.avatar} alt={usuarioActual.nombre} />
          <input
            ref={inputRef}
            className="fb-respuesta-input"
            placeholder={`Responder a ${comentario.autorNombre}...`}
            value={textoRespuesta}
            onChange={(e) => setTextoRespuesta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnviarRespuesta()}
          />
          <button
            className="fb-respuesta-send"
            onClick={handleEnviarRespuesta}
            disabled={!textoRespuesta.trim()}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Modal Compartir ──────────────────────────────────────────────────────────
function ModalCompartir({ post, onCerrar, onConfirmar }) {
  const { usuarioActual } = useUsuario();
  const [mensaje, setMensaje] = useState('');

  return (
    <div className="fb-modal-overlay" onClick={onCerrar}>
      <div className="fb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fb-modal-header">
          <span>Compartir publicación</span>
          <button className="fb-modal-close" onClick={onCerrar}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="fb-modal-body">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <img src={usuarioActual.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{usuarioActual.nombre}</div>
              <div style={{ fontSize: '13px', color: '#65676B' }}>
                <i className="fa fa-globe"></i> Público
              </div>
            </div>
          </div>
          <textarea
            className="fb-modal-textarea"
            placeholder="Escribe algo sobre esto..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <div className="fb-modal-preview">
            <div className="fb-modal-preview-inner">
              <strong>{post.autor.nombre}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#050505' }}>
                {post.contenido.substring(0, 100)}{post.contenido.length > 100 ? '...' : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="fb-modal-footer">
          <button className="fb-modal-publicar" onClick={() => onConfirmar(mensaje)}>
            Publicar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Componente Principal: Publicacion ────────────────────────────────────────
function Publicacion({ post, onLike, onCompartir, onAgregarComentario, onLikeComentario, onAgregarRespuesta, onLikeRespuesta }) {
  const { usuarioActual } = useUsuario();

  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [textoComentario, setTextoComentario] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [likeado, setLikeado] = useState(false);
  const [animarLike, setAnimarLike] = useState(false);

  const inputComentarioRef = useRef(null);

  // useEffect: enfocar input al abrir comentarios
  useEffect(() => {
    if (mostrarComentarios && inputComentarioRef.current) {
      inputComentarioRef.current.focus();
    }
  }, [mostrarComentarios]);

  // useEffect: log didáctico cada vez que cambia el like
  useEffect(() => {
    if (likeado) {
      console.log(`[useEffect] Post "${post.id}" fue likeado por ${usuarioActual.nombre}`);
    }
  }, [likeado, post.id, usuarioActual.nombre]);

  const handleLike = () => {
    setLikeado(!likeado);
    setAnimarLike(true);
    setTimeout(() => setAnimarLike(false), 300);
    onLike(post.id);
  };

  const handleEnviarComentario = () => {
    const texto = textoComentario.trim();
    if (!texto) return;
    onAgregarComentario(post.id, {
      id: `com-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      autorNombre: usuarioActual.nombre,
      autorAvatar: usuarioActual.avatar,
      texto,
      likes: 0,
      likeado: false,
      tiempo: 'Ahora mismo',
      respuestas: [],
    });
    setTextoComentario('');
  };

  const renderImagenes = () => {
    if (!post.imagenes || post.imagenes.length === 0) return null;
    if (post.imagenes.length === 1) {
      return (
        <div className="fb-post-imagenes-1">
          <img src={post.imagenes[0]} alt="publicacion" />
        </div>
      );
    }
    return (
      <div className="fb-post-imagenes-2">
        {post.imagenes.map((src, i) => (
          <img key={i} src={src} alt={`img-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="fb-post">
        {/* ── Cabecera ── */}
        <div className="fb-post-header">
          <img className="fb-post-avatar" src={post.autor.avatar} alt={post.autor.nombre} />
          <div className="fb-post-header-info">
            <div className="fb-post-nombre">{post.autor.nombre}</div>
            <div className="fb-post-meta">
              <span>{post.tiempo}</span>
              <span>·</span>
              <IconoPrivacidad tipo={post.privacidad} />
            </div>
          </div>
          <div className="fb-post-options">
            <button className="fb-icon-btn" title="Más opciones">
              <i className="fa fa-ellipsis-h"></i>
            </button>
            <button className="fb-icon-btn" title="Cerrar">
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="fb-post-contenido">{post.contenido}</div>

        {/* ── Imágenes ── */}
        {renderImagenes()}

        {/* ── Contadores ── */}
        <div className="fb-post-contadores">
          <div className="fb-contadores-likes">
            <div className="fb-emoji-reactions">
              <span>👍</span>
              <span>❤️</span>
              <span>😂</span>
            </div>
            <span>{post.likes}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setMostrarComentarios(!mostrarComentarios)}
            >
              {post.comentarios.length} comentario{post.comentarios.length !== 1 ? 's' : ''}
            </span>
            <span>{post.compartidos} veces compartido</span>
          </div>
        </div>

        {/* ── Botones de acción ── */}
        <div className="fb-post-acciones">
          <button
            className={`fb-accion-btn ${likeado ? 'liked' : ''}`}
            onClick={handleLike}
            style={{ transform: animarLike ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.15s' }}
          >
            <i className={`fa fa-thumbs-${likeado ? 'up' : 'o-up'}`}></i>
            Me gusta
          </button>
          <button
            className="fb-accion-btn"
            onClick={() => setMostrarComentarios(!mostrarComentarios)}
          >
            <i className="fa fa-comment-o"></i>
            Comentar
          </button>
          <button
            className="fb-accion-btn"
            onClick={() => setMostrarModal(true)}
          >
            <i className="fa fa-share"></i>
            Compartir
          </button>
        </div>

        {/* ── Comentarios ── */}
        {mostrarComentarios && (
          <div className="fb-comentarios">
            {/* Input nuevo comentario */}
            <div className="fb-comentario-input-row">
              <img src={usuarioActual.avatar} alt={usuarioActual.nombre} />
              <div className="fb-comentario-input-wrap">
                <textarea
                  ref={inputComentarioRef}
                  className="fb-comentario-input"
                  placeholder="Escribe un comentario..."
                  rows={1}
                  value={textoComentario}
                  onChange={(e) => setTextoComentario(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleEnviarComentario();
                    }
                  }}
                />
                <button
                  className="fb-comentario-send"
                  onClick={handleEnviarComentario}
                  disabled={!textoComentario.trim()}
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>

            {/* Lista de comentarios */}
            {post.comentarios.map((com) => (
              <Comentario
                key={com.id}
                comentario={com}
                postId={post.id}
                onLikeComentario={onLikeComentario}
                onAgregarRespuesta={onAgregarRespuesta}
                onLikeRespuesta={onLikeRespuesta}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal Compartir ── */}
      {mostrarModal && (
        <ModalCompartir
          post={post}
          onCerrar={() => setMostrarModal(false)}
          onConfirmar={(msg) => { onCompartir(post.id, msg); setMostrarModal(false); }}
        />
      )}
    </>
  );
}

export default Publicacion;
