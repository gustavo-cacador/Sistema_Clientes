const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const DB_PATH = './clientes.json';

// inicia o arquivo caso não exista
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, '[]');
}

// método get para listar clientes
app.get('/api/clientes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  res.json(data);
});

// método get para detalhar cliente por id
app.get('/api/clientes/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  const cliente = data.find(c => c.id === req.params.id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// método post para criar novos clientes
app.post('/api/clientes', (req, res) => {
  const novoCliente = { id: uuidv4(), ...req.body };

  const data = JSON.parse(fs.readFileSync(DB_PATH));
  data.push(novoCliente);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.status(201).json(novoCliente);
});

app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
