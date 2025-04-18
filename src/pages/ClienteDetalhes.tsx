import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Conta {
  id: string;
  tipo: string;
  saldo: number;
  limiteCredito: number;
  creditoDisponivel: number;
}

interface Agencia {
  nome: string;
  codigo: string;
  endereco: string;
}

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
  agencia?: Agencia;
  contas?: Conta[];
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

  const rendaAnual = cliente.rendaAnual ?? 0;
  const patrimonio = cliente.patrimonio ?? 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
      <h2 style={{ marginBottom: '30px' }}>Detalhes do Cliente</h2>
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ marginBottom: '18px' }}>Informações Pessoais</h3>
          <p><strong>Nome</strong><br />{cliente.nome}</p>
          <p><strong>CPF/CNPJ</strong><br />{cliente.cpfCnpj}</p>
          <p><strong>RG</strong><br />{cliente.rg || 'N/A'}</p>
          <p><strong>Data de Nascimento</strong><br />{cliente.dataNascimento}</p>
          <p><strong>Estado Civil</strong><br />{cliente.estadoCivil}</p>
          <p><strong>Email</strong><br />{cliente.email}</p>
        </div>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ marginBottom: '18px' }}>Informações Financeiras</h3>
          <p><strong>Renda Anual</strong><br />R$ {rendaAnual > 0 ? rendaAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'N/A'}</p>
          <p><strong>Patrimônio</strong><br />R$ {patrimonio > 0 ? patrimonio.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'N/A'}</p>
          <p><strong>Endereço</strong><br />{cliente.endereco}</p>
          <p><strong>Código da Agência</strong><br />{cliente.codigoAgencia}</p>
        </div>
      </div>

      {/* Bloco Agência */}
      {cliente.agencia && (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '32px',
          marginTop: '40px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span role="img" aria-label="agência">🏦</span> Agência
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p><strong>Nome</strong><br />{cliente.agencia.nome}</p>
              <p><strong>Endereço</strong><br />{cliente.agencia.endereco}</p>
            </div>
            <div>
              <p><strong>Código</strong><br />{cliente.agencia.codigo}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bloco Contas Bancárias */}
      <h3 style={{ marginBottom: '18px' }}>Contas Bancárias</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        {cliente.contas && cliente.contas.map((conta) => {
          // Cálculo da utilização de crédito
          const utilizacaoCredito = conta.limiteCredito > 0
            ? Math.round(100 * (conta.limiteCredito - conta.creditoDisponivel) / conta.limiteCredito)
            : 0;
          return (
            <div key={conta.id} style={{
              flex: 1,
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderTop: '3px solid #1976d2'
            }}>
              <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span role="img" aria-label="conta">💳</span> {conta.tipo}
              </h4>
              <p><strong>ID:</strong> {conta.id}</p>
              <p><strong>Saldo:</strong> <span style={{ color: '#2e7d32', fontWeight: 600 }}>R$ {conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
              <p><strong>Limite de Crédito:</strong> R$ {conta.limiteCredito.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p><strong>Crédito Disponível:</strong> <span style={{ color: '#1565c0' }}>R$ {conta.creditoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
              <p style={{ marginTop: 20, color: '#666', fontSize: 15 }}>
                <span role="img" aria-label="info">ℹ️</span> Utilização de crédito: <strong>{conta.limiteCredito > 0 ? utilizacaoCredito + '%' : 'NaN%'}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClienteDetalhes;
