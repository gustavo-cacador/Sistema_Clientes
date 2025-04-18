import { useEffect, useState } from "react";
import { Cliente } from "../types";

const ListaClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5173/clientes")
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
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nome Social</th>
            <th>CPF/CNPJ</th>
            <th>RG</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Estado Civil</th>
            <th>Código Agência</th>
            <th>Renda Anual</th>
            <th>Patrimônio</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.nomeSocial}</td>
              <td>{cliente.cpfCnpj}</td>
              <td>{cliente.rg}</td>
              <td>{cliente.email}</td>
              <td>{new Date(cliente.dataNascimento).toLocaleDateString()}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.estadoCivil}</td>
              <td>{cliente.codigoAgencia}</td>
              <td>R$ {cliente.rendaAnual.toFixed(2)}</td>
              <td>R$ {cliente.patrimonio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaClientes;
