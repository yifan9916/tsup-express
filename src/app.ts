import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import createError from 'http-errors';

import { router as mainRouter } from './routes/main';

const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();

app.use(morgan(IS_DEV ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');
app.disable('etag');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);

app.get('/healthz', (req, res) => {
  res.send({ message: 'Ok!' });
});

app.use(function (req, res, next) {
  next(createError(404));
});

export default app;
