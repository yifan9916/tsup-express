import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();

app.use(morgan(IS_DEV ? 'dev' : 'combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
app.disable('etag');

app.get('/healthz', (req, res) => {
  res.send({ message: 'Ok!' });
});

export default app;
