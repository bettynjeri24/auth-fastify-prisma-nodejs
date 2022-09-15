# Intialization of the project
yarn init

### Installation Instructions
npx --package typescript tsc --init
### RUN
 yarn add @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt @fastify/jwt@5.0.0
### RUN
yarn add ts-node-dev typescript @types/node --dev 

 
### Set up the run script

 script:{
    "dev": "tsnd --respawn --transpile-only --exit-child src/app.ts"
 }


 ### RUN
 yarn dev or yarn start

 # Initialize prisma

 npx prisma init --datasource-provider postgresql


 ### Migrate the schema

 npx prisma migrate dev --name init

 ### Configure the database

DATABASE_URL="postgresql://postgres:""@localhost:5432/auth-fastify-prisma-nodejs?schema=public"

# Learning Materials
### https://youtu.be/LMoMHP44-xM
YouTube video
### PostgreSQL Database (https://www.postgresqltutorial.com/postgresql-administration/psql-commands/)
PostgreSQL Database commands
psql –U postgres

