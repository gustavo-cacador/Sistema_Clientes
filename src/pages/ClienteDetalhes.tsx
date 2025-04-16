import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  email: string;
  rendaAnual: number;
  patrimonio: number;
  estadoCivil: string;
  endereco: string;
  dataNascimento: string;
  rg?: string;
  nomeSocial?: string;
  codigoAgencia: number;
}

function ClienteDetalhes() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/clientes/${id}`)
        .then(res => setCliente(res.data))
        .catch(err => console.error("Erro ao carregar os detalhes do cliente:", err));
    }
  }, [id]);

  if (!cliente) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Detalhes do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Nome Social:</strong> {cliente.nomeSocial || 'N/A'}</p>
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      <p><strong>RG:</strong> {cliente.rg || 'N/A'}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toFixed(2)}</p>
      <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toFixed(2)}</p>
      <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
      <p><strong>Endereço:</strong> {cliente.endereco}</p>
      <p><strong>Data de Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
      <p><strong>Código da Agência:</strong> {cliente.codigoAgencia}</p>
    </div>
  );
}

export default ClienteDetalhes;
