import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: null
  });

  const API_URL = "https://backend-cozyhome.onrender.com/api";
  const token = localStorage.getItem("token");

  const cargarProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProductos(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error cargando productos",
        confirmButtonColor: "#7b2ff7"
      });
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImagen = (e) =>
    setForm({ ...form, imagen: e.target.files[0] });

  const agregarProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    try {
      await axios.post(`${API_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: null
      });

      cargarProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error creando producto",
        confirmButtonColor: "#7b2ff7"
      });
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    await axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    cargarProductos();
  };

  const cargarPedidos = async () => {
    try {
      const res = await axios.get(`${API_URL}/sales`);
      setPedidos(res.data);
    } catch (error) {
      console.error(error);
      alert("Error cargando pedidos");
    }
  };

  const cambiarEstado = async (id_sale, estado) => {
    await axios.put(`${API_URL}/sales/${id_sale}`, { estado });
    cargarPedidos();
  };

  useEffect(() => {
    cargarProductos();
    cargarPedidos();
  }, []);

  return (
    <div className="container mt-4">

      <h2>Panel de Administración</h2>

      <h4 className="mt-4">Agregar producto</h4>

      <form onSubmit={agregarProducto} className="mb-4">
        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <textarea className="form-control mb-2" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input className="form-control mb-2" type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input className="form-control mb-2" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required />
        <input className="form-control mb-2" type="file" onChange={handleImagen} required />

        {form.imagen && (
          <img
            src={URL.createObjectURL(form.imagen)}
            alt="preview"
            width="120"
          />
        )}

        <button className="btn btn-success w-100 mt-2">
          Agregar producto
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>
                <img src={`https://backend-cozyhome.onrender.com${p.imagen}`} width="70" />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-5">Pedidos</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Productos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay pedidos
              </td>
            </tr>
          ) : (
            pedidos.map(p => (
              <tr key={p.id_sale}>
                <td>{p.id_sale}</td>
                <td>{p.identificacion_usuario}</td>
                <td>${Number(p.total).toLocaleString("es-CO")}</td>
                <td>{p.estado}</td>
                <td>
                  {p.detalles.map(d => (
                    <div key={d.id_detail}>
                      {d.nombre_producto} x {d.cantidad}
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${p.estado === "pendiente" ? "btn-success" : "btn-warning"}`}
                    onClick={() =>
                      cambiarEstado(
                        p.id_sale,
                        p.estado === "pendiente" ? "completada" : "pendiente"
                      )
                    }
                  >
                    Cambiar estado
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}



