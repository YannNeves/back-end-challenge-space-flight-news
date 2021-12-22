import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import path from 'path';
import { mongoConnect } from './database/mongo';
import apiRoutes from './routes/api';

const server = express();

mongoConnect();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.status ? res.status(err.status) : res.status(400);
  err.message ? res.json({ error: err.message }) : res.status(400).json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

export default server;
