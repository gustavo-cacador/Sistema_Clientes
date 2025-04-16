import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clientes from './pages/Clientes';
import ClienteDetalhes from './pages/ClienteDetalhes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Sistema de Clientes</h1>
          <nav>
            <ul>
              <li><Link to="/clientes">Clientes</Link></li>
              {/* Outros links de navegação */}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            {/* Esta rota está corretamente configurada para o detalhe do cliente */}
            <Route path="/clientes/:id" element={<ClienteDetalhes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
