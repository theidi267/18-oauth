'use strict';

import express from 'express';

const router = express.Router();

import {finder, list} from '../middleware/models.js'; //eslint-disable-line

router.get('/api/v1/models', (req,res) => {
  res.send(list());
});

export default router;