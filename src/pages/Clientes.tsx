import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string;
  rendaAnual: number;
}

function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');

  //estado do novo cliente do formulário
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    cpfCnpj: '',
    email: '',
    rendaAnual: ''
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    axios.get('http://localhost:8080/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/clientes', {
      ...novoCliente,
      rendaAnual: parseFloat(novoCliente.rendaAnual)
    })
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        setNovoCliente({
          nome: '',
          cpfCnpj: '',
          email: '',
          rendaAnual: ''
        });
        carregarClientes();
      })
      .catch(err => console.error(err));
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.cpfCnpj.includes(busca)
  );

  return (
    <div className="clientes-container">
      <h2>Lista de Clientes</h2>
      
      <input
        type="text"
        placeholder="Buscar por nome ou CPF/CNPJ"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>Renda Anual</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(cliente => (
            <tr key={cliente.id}>
              <td>
                <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
              </td>
              <td>{cliente.cpfCnpj}</td>
              <td>{cliente.email}</td>
              <td>R$ {cliente.rendaAnual.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Cadastrar Novo Cliente</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpfCnpj"
          placeholder="CPF ou CNPJ"
          value={novoCliente.cpfCnpj}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={novoCliente.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rendaAnual"
          placeholder="Renda Anual"
          value={novoCliente.rendaAnual}
          onChange={handleChange}
          required
        />
        <button type="submit">Salvar Cliente</button>
      </form>
    </div>
  );
}

export default Clientes;
