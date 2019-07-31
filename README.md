<h1 align="center">
  Desafio Backend Webedia
</h1>

Esse projeto é um desafio da Webedia.

## :rocket: Instalação

Clone o repositório:

```bash
git clone https://github.com/pandaluk/desafio-webedia
```

Instale o seguinde container do Docker:

```bash
docker run --name webedia -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Dentro da pasta do projeto agora, execute os seguintes passos:
Instale as dependências:

```bash
yarn
```

Instale o [Postbird](https://electronjs.org/apps/postbird) e conecte no docker(senha = docker):

Execute as Migrations do Sequelize:

```bash
yarn sequelize db:migrate
```

Execute o seguinte comando para iniciar o server:

```bash
yarn dev
```

## Executando as rotas

Importe o arquivo insomnia_config.json para o seu API environment de preferência.
Como a API utiliza o JWT é necessário criar um usuário primeiro, depois criar uma session para conseguir o token e acessar as demais urls.

## :books: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/docker-community)
- [Sequelize](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres](https://www.npmjs.com/package/pg)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Yup](https://www.npmjs.com/package/yup)
- [Slug](https://www.npmjs.com/package/slug)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Slug](https://www.npmjs.com/package/slug)
- [Youch](https://www.npmjs.com/package/youch)
- [Jest](https://jestjs.io/)
- [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Feito por Arthur Santos :wave:
[LinkedIn](https://www.linkedin.com/in/arthursilva92/)
