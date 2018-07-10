'use strict';

import express from 'express';

const router = express.Router();

import {finder, list} from '../middleware/models.js'; //eslint-disable-line
import model from '../auth/model.js'; //eslint-disable-line

import * as models from '../middleware/models.js';
router.param('model', models.finder);

router.get('/api/v1/models', (req, res, next) => { //eslint-disable-line
  res.send(list());
});

router.get('/api/v1/:model', (req, res, next) => {
  req.model.find({})
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.get('/api/v1/:model/schema', (req, res, next) => { //eslint-disable-line
  let schema = (typeof req.model.jsonSchema === 'function') ? req.model.jsonSchema() : {};
  sendJSON(res, schema);
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default router;