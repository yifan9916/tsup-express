import express from 'express';

import { asyncHandler } from '../utils/async-handler';

export const router = express.Router();

router.get(
  '*',
  asyncHandler((req, res) => {
    res.send({ message: 'Hello world!' });
  })
);
