import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NovoCliente() {
  const [form, setForm] = useState({
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

  const [cliente, setCliente] = useState<any>(null);  // Para armazenar o cliente cadastrado
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/clientes', {
        ...form,
        rendaAnual: parseFloat(form.rendaAnual),
        patrimonio: parseFloat(form.patrimonio),
        codigoAgencia: parseInt(form.codigoAgencia)
      });

      // salva os dados do cliente retornados pela API
      setCliente(response.data); 
      alert('Cliente cadastrado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      alert('Erro ao cadastrar cliente.');
      console.error(error);
    }
  };

  return (
    <div className="novo-cliente-container">
      <h2>Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nomeSocial"
          placeholder="Nome Social"
          value={form.nomeSocial}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpfCnpj"
          placeholder="CPF ou CNPJ"
          value={form.cpfCnpj}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rg"
          placeholder="RG"
          value={form.rg}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dataNascimento"
          placeholder="Data de Nascimento"
          value={form.dataNascimento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="estadoCivil"
          placeholder="Estado Civil"
          value={form.estadoCivil}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="codigoAgencia"
          placeholder="Código da Agência"
          value={form.codigoAgencia}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rendaAnual"
          placeholder="Renda Anual"
          value={form.rendaAnual}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="patrimonio"
          placeholder="Patrimônio"
          value={form.patrimonio}
          onChange={handleChange}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      {cliente && (
        <div className="cliente-cadastrado">
          <h3>Cliente Cadastrado:</h3>
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
          <p><strong>CPF ou CNPJ:</strong> {cliente.cpfCnpj}</p>
          <p><strong>RG:</strong> {cliente.rg}</p>
          <p><strong>E-mail:</strong> {cliente.email}</p>
          <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</p>
          <p><strong>Endereço:</strong> {cliente.endereco}</p>
          <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
          <p><strong>Código da Agência:</strong> {cliente.codigoAgencia}</p>
          <p><strong>Renda Anual:</strong> {cliente.rendaAnual}</p>
          <p><strong>Patrimônio:</strong> {cliente.patrimonio}</p>
        </div>
      )}
    </div>
  );
}

export default NovoCliente;
