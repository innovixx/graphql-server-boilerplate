import { createServer } from 'http';
import { config as dotenv } from 'dotenv';
import type { Application } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import helmet from 'helmet';
import type { IResolvers } from '@graphql-tools/utils';
import { resolvers, typeDefs } from './graphql/index.js';
import { logger } from './lib/logger/index.js';

dotenv();

const isDev = process.env.NODE_ENV === 'development';

const mount = async (app: Application): Promise<void> => {
  try {
    const schema = makeExecutableSchema({
      resolvers: resolvers as IResolvers,
      typeDefs,
    });

    const httpServer = createServer(app);

    const corsOrigin = isDev ? [`${process.env.CLIENT_URL}`, 'https://studio.apollographql.com'] : process.env.CLIENT_URL;
    app.use(cookieParser(process.env.SECRET));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors({
      credentials: true,
      origin: corsOrigin,
    }));
    app.use(helmet({
      contentSecurityPolicy: isDev ? false : undefined,
    }));

    const server = new ApolloServer({
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
      ],
      schema,
    });

    await server.start();

    app.use(
      '/api',
      expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res }),
      }) as unknown as express.RequestHandler,
    );

    httpServer.listen(process.env.PORT, () => {
      logger.info(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    logger.error(String(err));
  }
};

mount(express()).catch((err) => logger.error(String(err)));
