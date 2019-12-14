const express = require('express');
const router = express.Router();
const app = express();
const elasticSearch = require('elasticsearch');
const elasticClient = new elasticSearch.Client({
  host: 'http://localhost:9200',
  log: 'trace'
});
console.log(elasticClient);



app.use((req, res, next) => {
  console.log('Header Modification');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/shakespeare', async(req, res, next)  => {
  console.log('Api Call. Elastic Client = ', elasticClient);
  const response = await elasticClient.search({index: 'shakespeare', body: req.body});
  // res.send(response);
});

module.exports = app;
