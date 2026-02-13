import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const comprarProducto = (producto) => {
    const token = localStorage.getItem("token");

    if (!token) {
      
      Swal.fire({
        icon: "warning",
        title: "Acceso requerido",
        text: "Debes iniciar sesión para comprar",
        confirmButtonColor: "#7b2ff7"
      });
      navigate("/login");
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "El producto ha sido agregado al carrito",
      confirmButtonColor: "#7b2ff7"
    });
  };

  useEffect(() => {

    if (document.getElementById("n8n-chat-loaded")) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.type = "module";
    script.id = "n8n-chat-loaded";
    script.innerHTML = `
      import { createChat } from "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";

      createChat({
        webhookUrl: "https://hooks.singularity.cyou/webhook/b138fea5-c0c3-46bf-b2f4-35fad802bf79/chat",
        target: "#n8n-chat",
        mode: "window",
        loadPreviousSession: false,
        showWelcomeScreen: false,
        initialMessages: [
          "Hola, bienvenido a CozyHome!",
          "Soy el asistente de CozyHome ",
          "Puedo ayudarte a elegir productos "
        ],
      });
    `;

    document.getElementById("n8n-chat")?.appendChild(script);

    return () => {
      script.remove();
      link.remove();

      const chat = document.getElementById("n8n-chat");
      if (chat) chat.innerHTML = "";
    };
  }, []);

  return (
    <div className="productos-layout">

      <div className="productos-col">
        <h2 className="mb-4">Productos</h2>

        <div className="row">
          {productos.map(p => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm">

                <img
                  src={`http://localhost:8000${p.imagen}`}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{p.nombre}</h5>
                  <p>{p.descripcion}</p>
                  <strong>${p.precio}</strong>
                </div>

                <div className="card-footer d-flex gap-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => comprarProducto(p)}
                  >
                    Comprar
                  </button>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/sale")}
                  >
                    🛒
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-col">
        <div id="n8n-chat"></div>
      </div>

    </div>
  );
}




