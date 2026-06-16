const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const encomendas = {
  'BR123': { id: 'BR123', status: 'Saiu para entrega', local: 'Santos, SP' },
  'BR456': { id: 'BR456', status: 'Entregue', local: 'Rio de Janeiro, RJ' },
  'BR789': { id: 'BR789', status: 'Em trânsito', local: 'Belo Horizonte, MG' }
};

app.get('/rastreio/:codigo', (req, res) => {
  const codigo = req.params.codigo;

  if (codigo === 'ERRO500') {
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      mensagem: 'Falha na conexão com o banco de dados principal.'
    });
  }

  if (codigo.length < 5) {
    return res.status(400).json({
      error: 'BAD_REQUEST',
      mensagem: 'O código de rastreio deve ter no mínimo 5 caracteres'
    });
  }

  const pacote = encomendas[codigo];

  if (!pacote) {
    return res.status(404).json({
      error: 'NOT_FOUND',
      mensagem: 'Encomenda não encontrada'
    });
  }

  res.json(pacote);
});
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('Rotas de teste:');
  console.log(' -> /rastreio/BR123 (Sucesso)');
  console.log(' -> /rastreio/XYZ (Erro 404)');
  console.log(' -> /rastreio/123 (Erro 400)');
  console.log(' -> /rastreio/ERRO500 (Erro 500)');
});