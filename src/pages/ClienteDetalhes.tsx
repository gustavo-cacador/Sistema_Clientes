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

  const rendaAnual = cliente.rendaAnual ?? 0; // Verifica se rendaAnual está presente, senão define como 0
  const patrimonio = cliente.patrimonio ?? 0; // Verifica se patrimonio está presente, senão define como 0

  return (
    <div>
      <h2>Detalhes do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Renda Anual:</strong> R$ {rendaAnual > 0 ? rendaAnual.toFixed(2) : 'N/A'}</p>
      <p><strong>Patrimônio:</strong> R$ {patrimonio > 0 ? patrimonio.toFixed(2) : 'N/A'}</p>
      <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
      <p><strong>Endereço:</strong> {cliente.endereco}</p>
      <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</p>
      {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>}
      {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>}
      <p><strong>Código da Agência:</strong> {cliente.codigoAgencia}</p>
    </div>
  );
}

export default ClienteDetalhes;
