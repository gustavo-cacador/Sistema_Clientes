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
    axios.get(`http://localhost:8080/api/clientes/${id}`)
      .then(res => setCliente(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!cliente) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toFixed(2)}</p>
      <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toFixed(2)}</p>
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
