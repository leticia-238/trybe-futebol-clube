<h1 align="center">
  :soccer: Trybe Futebol Clube
</h1>

&emsp;

![app-preview](./screen-capture.gif)

## Sobre o projeto

O Trybe Futebol Clube é um site informativo sobre partidas e classificações de futebol. 

Este projeto é composto por uma aplicação front-end e uma aplicação back-end integradas. O front-end consiste em uma aplicação React com uma tela de login para o usuário e uma tabela que exibe as informações disponibilizadas pela API desenvolvida no back-end. 

O front-end, os scripts de build e as configurações iniciais do ORM Sequelize e do Express foram desenvolvidos pela equipe da [Trybe](https://www.betrybe.com/), escola de programação onde eu realizei este projeto. Toda as outras implementações no back-end foram feitas por mim, incluindo os endpoints, validações, regras de negócio, criação das tabelas do banco de dados através dos models e migrations do ORM Sequelize e todas os testes de integração.

## Tecnologias e Ferramentas utilizadas 

**Banco de Dados**: MySQL 

**Front-end**: React

**Back-end**: Node.js, Typescript, Express.js, JWT, ORM Sequelize

**Testes**: Mocha, Chai, Sinon

**Containerização dos serviços**: Docker

## Instruções para a instalação

### Pré-requisitos para iniciar a aplicação no computador:

- `OS distribuição Unix`
- `node >=16.15.0`
- `docker`
- [`docker-compose >=1.29.2`](https://docs.docker.com/compose/install/)

### Execute os seguintes passos no terminal:

1. Clone o projeto: `git clone git@github.com:leticia-238/trybe-futebol-clube.git`

2. Entre na pasta do repositório clonado: `cd trybe-futebol-clube`

3. Inicialize o docker-compose: `npm run compose:up`

> Obs: Para desenvolvimento é recomendável o uso do comando `npm run compose:up:dev` pois, diferente do comando anterior, este comando está configurado para compartilhar volumes com o docker e também utiliza o script que realiza o live-reload ao fazer modificações no back-end.






