import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import router from '@shared/routes/index';
import 'express-async-errors';
import errorHandler from '@middlewares/testerro';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Middleware de tratamento de erros
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    errorHandler(err, req, res, next);
  },
);

app.listen(3333, () => {
  console.log('Server is running on port 3333! 🚀');
});
