import { useEffect, useState } from "react";
import axios from "axios";

export default function Pedidos() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!user?.identificacion) return;

    axios
      .get(`https://backend-cozyhome.onrender.com/sales/user/${user.identificacion}`)
      .then(res => setSales(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mis pedidos</h2>

      {sales.length === 0 && <p>No has comprado aún</p>}

      {sales.map(sale => (
        <div key={sale.id_sale} className="card mb-4">
          <div className="card-header">
            Compra #{sale.id_sale}
          </div>

          <div className="card-body">
            <p>Total: ${sale.total.toLocaleString("es-CO")}</p>

            <ul className="list-group">
              {sale.detalles.map(d => (
                <li key={d.id_detail} className="list-group-item">
                  <strong>{d.nombre_producto}</strong><br />
                  Precio: ${d.precio}<br />
                  Cantidad: {d.cantidad}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}



