import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

injectMiddleware(server);
injectRoutes(server);
startServer(server);

export default server;
