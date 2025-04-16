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
  const [editandoId, setEditandoId] = useState<string | null>(null);

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

    const clienteData = {
      ...novoCliente,
      rendaAnual: parseFloat(novoCliente.rendaAnual)
    };

    if (editandoId) {
      axios.put(`http://localhost:8080/api/clientes/${editandoId}`, clienteData)
        .then(() => {
          alert('Cliente atualizado com sucesso!');
          resetarFormulario();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:8080/api/clientes', clienteData)
        .then(() => {
          alert('Cliente cadastrado com sucesso!');
          resetarFormulario();
        })
        .catch(err => console.error(err));
    }
  };

  const resetarFormulario = () => {
    setNovoCliente({
      nome: '',
      cpfCnpj: '',
      email: '',
      rendaAnual: ''
    });
    setEditandoId(null);
    carregarClientes();
  };

  const editarCliente = (cliente: Cliente) => {
    setNovoCliente({
      nome: cliente.nome,
      cpfCnpj: cliente.cpfCnpj,
      email: cliente.email,
      rendaAnual: cliente.rendaAnual.toString()
    });
    setEditandoId(cliente.id);
  };

  const excluirCliente = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      axios.delete(`http://localhost:8080/api/clientes/${id}`)
        .then(() => {
          alert('Cliente excluído com sucesso!');
          carregarClientes();
        })
        .catch(err => console.error(err));
    }
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
            <th>Ações</th>
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
              <td>
                <button onClick={() => editarCliente(cliente)}>Editar</button>
                <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editandoId ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h3>
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
        <button type="submit">{editandoId ? 'Atualizar' : 'Salvar Cliente'}</button>
        {editandoId && (
          <button type="button" onClick={resetarFormulario} style={{ marginLeft: '10px' }}>
            Cancelar Edição
          </button>
        )}
      </form>
    </div>
  );
}

export default Clientes;
