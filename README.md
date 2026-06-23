# 📦 Rastreio de Encomendas

Exercício acadêmico de consumo de API REST com JavaScript. Simula o rastreamento de encomendas via backend Node.js com Express, consumido por um frontend HTML/Bootstrap.

> **Contexto:** projeto desenvolvido como prática de integração frontend-backend, tratamento de erros HTTP e manipulação do DOM com JavaScript puro.

---

## Funcionalidades

- Consulta de encomenda por código via requisição HTTP GET
- Exibição de status e localização do pacote
- Tratamento diferenciado para erros 400, 404 e 500
- Feedback visual ao usuário por meio de alertas Bootstrap

---

## Tecnologias

| Camada    | Tecnologia            |
|-----------|-----------------------|
| Backend   | Node.js + Express     |
| Frontend  | HTML, JavaScript, Bootstrap 5 |
| Protocolo | REST (HTTP/JSON)      |

---

## Como executar

**Pré-requisitos:** Node.js instalado.

```bash
# Instalar dependências
npm install

# Iniciar o servidor
node server.js
```

Abra o `index.html` no navegador. O servidor precisa estar rodando na porta `3000`.

---

## Endpoints disponíveis

| Método | Rota                  | Descrição                       |
|--------|-----------------------|---------------------------------|
| GET    | `/rastreio/:codigo`   | Retorna status e local do pacote |

### Códigos de teste

| Código    | Comportamento esperado      |
|-----------|-----------------------------|
| `BR123`   | 200 — Saiu para entrega     |
| `BR456`   | 200 — Entregue              |
| `BR789`   | 200 — Em trânsito           |
| `XYZ`     | 404 — Não encontrado        |
| `123`     | 400 — Código inválido       |
| `ERRO500` | 500 — Erro interno simulado |

---

## Estrutura do projeto

```
api_encomendas/
├── index.html      # Interface do usuário
├── server.js       # Servidor Express com mock de dados
├── assets/
│   └── js/
│       └── script.js   # Lógica de fetch e tratamento de erros
└── package.json
```

---

## Limitações conhecidas

- Dados são mockados em memória — sem banco de dados real
- CORS habilitado sem restrição de origem (adequado apenas para desenvolvimento local)
- URL do backend hardcoded como `http://localhost:3000`
- Sem autenticação ou rate limiting

---

## Aprendizados aplicados

- Requisições assíncronas com `fetch` e `async/await`
- Tratamento de respostas HTTP com base no status code
- Manipulação do DOM e exibição condicional de elementos
- Criação de uma API REST simples com Express
