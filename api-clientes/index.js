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

// método post para criar novo cliente
app.post('/api/clientes', (req, res) => {
  const novoCliente = { id: uuidv4(), ...req.body };

  const data = JSON.parse(fs.readFileSync(DB_PATH));
  data.push(novoCliente);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.status(201).json(novoCliente);
});

// método put para atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpfCnpj, email, rendaAnual } = req.body;

  const data = JSON.parse(fs.readFileSync(DB_PATH));

  const clienteIndex = data.findIndex(c => c.id === id);

  if (clienteIndex !== -1) {
    data[clienteIndex] = { ...data[clienteIndex], nome, cpfCnpj, email, rendaAnual };
    
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

    res.status(200).json(data[clienteIndex]); // Retorna o cliente atualizado
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});


// método delete para deletar cliente
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;

  let data = JSON.parse(fs.readFileSync(DB_PATH));
  const cliente = data.find(c => c.id === id);

  if (cliente) {
    data = data.filter(c => c.id !== id);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
