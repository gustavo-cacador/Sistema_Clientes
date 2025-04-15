import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NovoCliente() {
  const [form, setForm] = useState({
    nome: '',
    cpfCnpj: '',
    email: '',
    rendaAnual: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/clientes', {
        ...form,
        rendaAnual: parseFloat(form.rendaAnual)
      });

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
          name="cpfCnpj"
          placeholder="CPF ou CNPJ"
          value={form.cpfCnpj}
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
          type="number"
          name="rendaAnual"
          placeholder="Renda Anual"
          value={form.rendaAnual}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default NovoCliente;
