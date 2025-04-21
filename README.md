# 📊 LinkedIn Profile Scraping API

API desenvolvida com NestJS para extração de perfis públicos do LinkedIn e armazenamento dos dados em MongoDB.

---

## ⚙️ Tecnologias Utilizadas

- **NestJS** – Framework Node.js para construção de APIs escaláveis
- **MongoDB** – Banco de dados NoSQL para persistência dos dados
- **TypeScript** – Tipagem estática para JavaScript
- **Mongoose** – ODM para integração entre Node.js e MongoDB

---

## 📁 Estrutura do Projeto

```
src/
├── linkedin/         # Módulo responsável pela lógica de scraping e rotas
├── app.module.ts     # Módulo principal da aplicação
└── main.ts           # Ponto de entrada da aplicação
```

---

## 🧰 Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB em execução local na porta padrão (27017)
- npm ou yarn

---

## ✨ Instalação e Execução

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Certifique-se de que o MongoDB está em execução localmente.

3. Inicie a aplicação em modo de desenvolvimento:

   ```bash
   npm run start:dev
   ```

---

## 💡 Configuração do Banco de Dados

- **Nome do Banco:** `Perfil_LK`
- **URL Padrão do MongoDB:** `mongodb://127.0.0.1:27017`
- **Coleção:** `linkedinprofiles`

---

## 📡 Endpoints da API

- `POST /linkedin/profile` – Salva os dados de um perfil do LinkedIn
- `GET /linkedin/profiles` – Recupera todos os perfis armazenados

---

## ⚠️ Tratamento de Erros

A aplicação possui tratamento para:

- Falhas na conexão com o banco de dados
- Formatos de dados inválidos
- Erros internos do servidor

---

## 🥪 Desenvolvimento

Para executar em modo de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

---

## 🏗️ Produção

Para construir e executar em ambiente de produção:

```bash
npm run build
npm run start
```

---

## 🐳 Docker

Para criar a imagem docker e subir a imagem no docker desktop

```bash
docker compose build
docker compose up -d
```

---

## 👋 Contribuições

Sinta-se à vontade para abrir issues, enviar PRs ou sugerir melhorias!

