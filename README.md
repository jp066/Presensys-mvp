# ShopLink Backend

Backend para o sistema ShopLink, desenvolvido em Node.js com Express, autenticação JWT, integração com banco de dados SQL Server (usando Tedious) e arquitetura modular.

## Sumário

- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts](#scripts)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Rotas](#rotas)
- [Licença](#licença)

## Tecnologias

- Node.js
- Express
- Passport + JWT
- Tedious (SQL Server)
- dotenv
- bcrypt
- Morgan


## Estrutura de Pastas
src/
  auth/           # Serviços de autenticação e logout
  config/         # Configurações de banco e passport
  controllers/    # Lógica das rotas
  middlewares/    # Middlewares globais e de validação
  routes/         # Definição das rotas
  services/       # Serviços de acesso ao banco, logicas de negocio etc
  utils/          # Utilitários e classes de erro
public/           # Arquivos estáticos (CSS, imagens)
