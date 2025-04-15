import { useEffect, useState } from "react";
import { Cliente } from "../types";

const ListaClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5173/clientes") // <-- substitua pela URL real da API
      .then(res => res.json())
      .then(data => {
        setClientes(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro ao buscar clientes:", err);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando clientes...</p>;

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <strong>{cliente.nome}</strong> – {cliente.cpfCnpj} – {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
