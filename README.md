# Typescript crud

Este é um crud typescript que demonstra os seguintes padrões:
- monorepo
- Workspaces múltiplos

## Ecossistema

#### **Core**
* **TypeScript:** Adiciona tipagem ao JavaScript
* **Turborepo:** Gerencia os pacotes do monorepo

#### **Backend (apps/api)**
* **NestJS:** Estrutura o servidor de forma organizada e escalável.
* **Prisma:** É um ORM (Object-Relational Mapper) que gerencia o banco de dados usando objetos TypeScript.
* **MySQL:** Banco de dados relacional para armazenamento persistente.

#### **Frontend (apps/web)**
* **Next.js:** Framework para sites rápidos com renderização no servidor (SSR).
* **React:** Biblioteca para criar interfaces de usuário baseadas em componentes.
* **Tailwind CSS:** Estiliza o layout diretamente no HTML via classes utilitárias.

#### **Ambiente de desenvolvimento**
* **NPM:** Gerenciador de pacotes.
* **DOCKER:** Container com o banco de dados PostgreSQL.


## Instalação

Primeiro, baixe o código e instale todos os pacotes necessários para o funcionamento de ambos os aplicativos.

#### 1. Clone o repositório e instalar dependencias
```
git clone https://github.com/rodrigosousasim/typescript-crud.git
cd typescript-crud
npm install
```

#### 2. Iniciar o container docker com o banco de dados
```
docker compose up -d
```

#### 3. Gere o Prisma Client para habilitar a tipagem nos Services
```
cd apps/api
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
```

#### 4. Rodar o backend e frontend em ambiente de desenvolvimento 
```
cd ../..
npm run dev
```