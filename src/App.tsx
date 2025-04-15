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
              {/* Adicionar outros itens quando tiver as páginas */} 
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/:id" element={<ClienteDetalhes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
