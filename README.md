# 📦 StockLedger API

> Uma API de controle de estoque construída para ser um laboratório vivo dos fundamentos essenciais do NestJS — arquitetura em camadas, Repository Pattern, autenticação real e consistência transacional de dados, tudo isso pensado desde a primeira linha de código.

---

## 🚀 Sobre o projeto

O **StockLedger** nasceu com uma proposta simples e ao mesmo tempo ambiciosa: **construir um sistema de estoque não como "mais um CRUD", mas como um registro auditável de verdade** — um *ledger*. Cada entrada e saída de produto é um evento rastreável, vinculado a um usuário e a um instante no tempo, garantido por transações atômicas no banco de dados. Não existe "editar a quantidade na mão" aqui: o saldo de cada produto é sempre o resultado direto do seu histórico de movimentações.

Mais do que uma API funcional, este projeto é um exercício deliberado de **arquitetura limpa e fundamentos sólidos de backend**: separação de responsabilidades entre Controller, Service e Repository, contratos de dados explícitos via DTOs, validação declarativa com Pipes, autenticação e autorização de verdade com JWT, e tudo isso containerizado para rodar em qualquer lugar com um único comando.

Se você está aqui pra entender **como construir uma API NestJS que aguenta crescer**, este repositório foi feito pra isso.

---

## ✨ Principais destaques

- 🧱 **Arquitetura em camadas de verdade** — Controller → Service → Repository, com interfaces desacoplando regra de negócio de acesso a dado
- 🔐 **Autenticação e autorização completas** — JWT + Guards + controle de acesso por papel (`ADMIN` / `OPERATOR`)
- 🧾 **Histórico de estoque auditável** — toda movimentação é um evento imutável, nunca uma edição direta
- ⚛️ **Consistência transacional** — entradas e saídas de estoque usam `$transaction` do Prisma, garantindo que o histórico e o saldo nunca fiquem dessincronizados
- 🛡️ **Validação em múltiplas camadas** — DTOs com `class-validator`, Pipes customizados e reutilizáveis entre módulos
- 📑 **Documentação viva via Swagger**, com decorators organizados separadamente de cada módulo
- 🩺 **Health check pronto para orquestração** — integrado ao Docker e preparado para ambientes de produção
- 🐳 **100% containerizado** — suba a aplicação inteira com um único `docker compose up`

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Framework | [NestJS](https://nestjs.com/) |
| Linguagem | TypeScript |
| ORM | [Prisma](https://www.prisma.io/) (v7) |
| Banco de dados | PostgreSQL |
| Autenticação | Passport + JWT |
| Validação | class-validator + class-transformer |
| Documentação | Swagger (`@nestjs/swagger`) |
| Health Check | `@nestjs/terminus` |
| Containerização | Docker + Docker Compose |

---

## 🏗️ Arquitetura

A API segue um fluxo de responsabilidades bem definido, onde cada camada tem um único motivo para mudar:

```
Requisição HTTP
      │
      ▼
   Controller        → recebe a requisição, aplica DTOs/Pipes, delega pro Service
      │
      ▼
     DTO              → valida e formata o contrato de entrada
      │
      ▼
    Service           → concentra a regra de negócio do domínio
      │
      ▼
   Repository          → abstrai o acesso a dados (interface + implementação Prisma)
      │
      ▼
    Prisma              → ORM que conversa com o banco
      │
      ▼
  PostgreSQL
```

### Por que uma camada de Repository, se o Prisma já é um ORM?

Porque o `Service` nunca deveria saber *como* o dado é persistido — só *o que* precisa ser feito com ele. Cada módulo expõe uma interface (`IProductsRepository`, `ICategoriesRepository`...) e uma implementação concreta injetada via token do NestJS. Isso significa:

- **Testes sem banco**: o Service é testado mockando a interface, não o Prisma inteiro
- **Independência de infraestrutura**: trocar de ORM (ou adicionar cache, por exemplo) afeta só a implementação, nunca a regra de negócio
- **Fronteiras explícitas**: qualquer pessoa lendo o código sabe exatamente onde a lógica de domínio termina e o acesso a dado começa

### Módulos do domínio

| Módulo | Responsabilidade |
|---|---|
| `health` | Diagnóstico de saúde da aplicação e do banco |
| `auth` | Registro, login e emissão de tokens JWT |
| `users` | Gestão de usuários e papéis de acesso |
| `categories` | Categorias de produtos |
| `products` | Catálogo de produtos, vinculado a uma categoria |
| `stock-movements` | Núcleo do domínio — histórico transacional de entradas e saídas de estoque |

Cada módulo segue a mesma estrutura interna, incluindo uma pasta `swagger/` dedicada aos decorators de documentação — mantendo os controllers enxutos e focados exclusivamente em orquestrar a requisição:

```
products/
├── products.module.ts
├── products.controller.ts
├── products.service.ts
├── dto/
├── repositories/
│   ├── products.repository.interface.ts
│   └── products.repository.ts
├── pipes/
└── swagger/
    └── products.swagger.ts
```

---

## 📐 Modelagem de dados

```
User 1───────N StockMovement
Category 1───N Product
Product  1───N StockMovement
```

O saldo de um `Product` nunca é editado diretamente — ele é sempre a soma resultante do seu histórico em `StockMovement`, aplicada via transação atômica no banco.

---

## ▶️ Como executar o projeto

### Pré-requisitos

- Node.js 20+
- PostgreSQL (local ou via Docker)
- Docker e Docker Compose (opcional, mas recomendado)

### Opção 1 — Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/stockledger-api.git
cd stockledger-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com sua string de conexão do PostgreSQL e o JWT_SECRET

# Rode as migrations
npx prisma migrate dev

# Suba a aplicação em modo desenvolvimento
npm run start:dev
```

A API estará disponível em `http://localhost:3000`, e a documentação Swagger em `http://localhost:3000/api`.

### Opção 2 — Rodando com Docker

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/stockledger-api.git
cd stockledger-api

# Configure as variáveis de ambiente
cp .env.example .env

# Suba tudo (API + PostgreSQL) com um único comando
docker compose up --build
```

O Docker Compose já orquestra a ordem de inicialização: a API só sobe depois que o healthcheck do PostgreSQL confirma que o banco está pronto para aceitar conexões.

### Variáveis de ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stockledger?schema=public"
JWT_SECRET="troque-por-um-segredo-forte-e-aleatorio"
JWT_EXPIRES_IN="1d"
```

---

## 📡 Endpoints principais

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `GET` | `/health` | — | Verifica a saúde da API e do banco |
| `POST` | `/auth/register` | — | Cadastra um novo usuário |
| `POST` | `/auth/login` | — | Autentica e retorna um token JWT |
| `GET` | `/users/me` | ✅ | Retorna o usuário autenticado |
| `POST` | `/categories` | ✅ | Cria uma categoria |
| `GET` | `/categories` | — | Lista categorias |
| `POST` | `/products` | ✅ | Cria um produto |
| `GET` | `/products` | — | Lista produtos |
| `GET` | `/products/:id/movements` | ✅ | Histórico de movimentações de um produto |
| `POST` | `/stock-movements` | ✅ | Registra uma entrada ou saída de estoque |
| `GET` | `/stock-movements` | ✅ | Lista movimentações (com filtro por produto) |

A documentação interativa completa (com todos os schemas de entrada/saída) fica disponível via Swagger em `/api` assim que a aplicação estiver no ar.

---

## 📄 Licença

Este projeto está sob a licença MIT 

---

