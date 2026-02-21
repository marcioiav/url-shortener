
# URL Shortener (Node.js + Express + TypeScript + Prisma + SQLite)

Pequeno encurtador de URLs que:

- Marcio F Iavorski
- Cria/encurta e persiste uma URL (`POST /urls`)
- Retorna URL por **ID** (`GET /urls/:id`)
- Lista todas as URLs encurtadas em **uma data específica** (`GET /urls?date=YYYY-MM-DD`)
- Retorna URL por **code** (`GET /codes/:code`)
- Redireciona (`GET /s/:code`) para a URL original

## Requisitos
- Node.js 18+
- PNPM/Yarn/NPM

## Instalação
```bash
npm i          # ou yarn / pnpm install
npm run prisma:push
npm run dev
```

Crie um arquivo `.env` baseado em `.env.example`.

## Rotas
- **POST /urls** — body `{ "url": "https://exemplo.com" }`
- **GET /urls/:id**
- **GET /urls?date=YYYY-MM-DD**
- **GET /codes/:code**
- **GET /s/:code**

## Testes
```bash
npm test
```

## Produção
- Use PostgreSQL e ajuste `DATABASE_URL`.
- Gere build com `npm run build` e suba em sua plataforma preferida.
