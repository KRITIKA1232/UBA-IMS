// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import cors from 'cors';
// // ✅ Removed body-parser, using built-in express.json instead
// import { typeDefs } from './schema_resolver/schema';
// import { resolvers } from './schema_resolver/resolvers';
// import dotenv from 'dotenv';

// dotenv.config(); // ✅ Load .env variables

// const app = express();
// const PORT = process.env.PORT || 4001;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// async function startServer() {
//   await server.start();

//   // ✅ Middleware setup in correct order
//   app.use(cors());
//   app.use(express.json()); // ✅ Critical for req.body to work

//   app.use(
//     '/graphql',
//     expressMiddleware(server, {
//       context: async () => ({}),
//     }) as unknown as express.RequestHandler
//   );

//   app.listen(4001, () =>
//     console.log(`🚀 Server ready at http://localhost:${4001}/graphql`)
//   );
// }

// startServer();



import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schema_resolver/schema';
import { resolvers } from './schema_resolver/resolvers';
import { connectDB, sequelize } from './helpers/db'; //  Import MySQL connection

dotenv.config(); //  Load environment variables

const app = express();
const PORT = process.env.PORT || 4001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await connectDB(); //  Connect to MySQL
  await sequelize.sync(); //  Sync Sequelize models with MySQL database
  await server.start();

  //  Middleware setup in correct order
  app.use(cors());
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async () => ({}),
    }) as unknown as express.RequestHandler
  );

  app.listen(PORT, () =>
    console.log(` Server ready at http://localhost:${PORT}/graphql`)
  );
}

startServer();
