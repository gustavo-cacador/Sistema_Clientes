import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Cliente {
  id: string;
  cpfCnpj: string;
  rg?: string;
  dataNascimento: Date;
  nome: string;
  nomeSocial?: string;
  email: string;
  endereco: string;
  rendaAnual: number;
  patrimonio: number;
  estadoCivil: "Solteiro"|"Casado"|"Viúvo"|"Divorciado";
  codigoAgencia: number;
}

function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [novoCliente, setNovoCliente] = useState({
    cpfCnpj: '',
    rg: '',
    dataNascimento: '',
    nome: '',
    nomeSocial: '',
    email: '',
    endereco: '',
    rendaAnual: '',
    patrimonio: '',
    estadoCivil: '',
    codigoAgencia: ''
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    axios.get('http://localhost:8080/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      rendaAnual: parseFloat(novoCliente.rendaAnual),
      patrimonio: parseFloat(novoCliente.patrimonio),
      codigoAgencia: parseInt(novoCliente.codigoAgencia)
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
      cpfCnpj: '',
      rg: '',
      dataNascimento: '',
      nome: '',
      nomeSocial: '',
      email: '',
      endereco: '',
      rendaAnual: '',
      patrimonio: '',
      estadoCivil: '',
      codigoAgencia: ''
    });
    setEditandoId(null);
    carregarClientes();
  };

  const editarCliente = (cliente: Cliente) => {
    setNovoCliente({
      cpfCnpj: cliente.cpfCnpj ?? '',
      rg: cliente.rg ?? '',
      dataNascimento: new Date(cliente.dataNascimento).toISOString().split('T')[0],
      nome: cliente.nome ?? '',
      nomeSocial: cliente.nomeSocial ?? '',
      email: cliente.email ?? '',
      endereco: cliente.endereco ?? '',
      rendaAnual: cliente.rendaAnual.toString(),
      patrimonio: cliente.patrimonio.toString(),
      estadoCivil: cliente.estadoCivil ?? '',
      codigoAgencia: cliente.codigoAgencia.toString()
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
            <th>Nome Social</th>
            <th>CPF/CNPJ</th>
            <th>RG</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Estado Civil</th>
            <th>Endereço</th>
            <th>Código Agência</th>
            <th>Patrimônio</th>
            <th>Renda Anual</th>
            <th>Ações</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(cliente => (
            <tr key={cliente.id}>
              <td>
                <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
              </td>
              <td>{cliente.nomeSocial}</td>
              <td>{cliente.cpfCnpj}</td>
              <td>{cliente.rg}</td>
              <td>{cliente.email}</td>
              <td>{new Date(cliente.dataNascimento).toLocaleDateString()}</td>
              <td>{cliente.estadoCivil}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.codigoAgencia}</td>
              <td>{cliente.patrimonio}</td>
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
          name="nomeSocial"
          placeholder="Nome Social"
          value={novoCliente.nomeSocial}
          onChange={handleChange}
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
          type="text"
          name="rg"
          placeholder="RG"
          value={novoCliente.rg}
          onChange={handleChange}
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
          type="date"
          name="dataNascimento"
          placeholder="Data de Nascimento"
          value={novoCliente.dataNascimento}
          onChange={handleChange}
          required
        />
        <select
          name="estadoCivil"
          value={novoCliente.estadoCivil}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o estado civil</option>
          <option value="Solteiro">Solteiro</option>
          <option value="Casado">Casado</option>
          <option value="Viúvo">Viúvo</option>
          <option value="Divorciado">Divorciado</option>
        </select>
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novoCliente.endereco}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="codigoAgencia"
          placeholder="Código Agência"
          value={novoCliente.codigoAgencia}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="patrimonio"
          placeholder="Patrimônio"
          value={novoCliente.patrimonio}
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
