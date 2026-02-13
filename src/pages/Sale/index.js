import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Sale() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("carrito", JSON.stringify(newCart));
  };

  const total = cart.reduce(
    (sum, p) => sum + Number(p.precio) * Number(p.cantidad || 1),
    0
  );

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }

    localStorage.setItem("cartToPay", JSON.stringify(cart));
    localStorage.setItem("totalToPay", total);

    navigate("/pago");
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>

      {cart.length === 0 ? (
        <>
          <p>No hay productos en el carrito</p>
          <button className="btn btn-secondary" onClick={() => navigate("/productos")}>
            Volver a productos
          </button>
        </>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td>${Number(p.precio).toLocaleString("es-CO")}</td>
                  <td>
                    <img src={`http://localhost:8000${p.imagen}`} width="80" alt={p.nombre} />
                  </td>
                  <td>{p.cantidad || 1}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${total.toLocaleString("es-CO")}</h4>

          <button className="btn btn-success mt-3" onClick={handleProceedToPayment}>
            Proceder al pago
          </button>
        </>
      )}
    </div>
  );
}


