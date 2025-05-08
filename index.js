require('dotenv').config();
const apm = require('elastic-apm-node').start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  environment: process.env.ELASTIC_APM_ENVIRONMENT,
  captureBody: process.env.ELASTIC_APM_CAPTURE_BODY,
});

const express = require('express');
const { fetchData } = require('./utils/fetchData.js');
const app = express();

// Route that kicks off a deep call chain
app.get('/apm-demo/entry', async (req, res, next) => {
  try {
    const result = await entryPoint(req.query.id);
    res.send(`Success: ${result}`);
  } catch (err) {
    next(err);
  }
});

async function entryPoint(id) {
  console.log('entryPoint → fetchData');
  return await fetchData(id);
}

app.use((err, req, res, next) => {
  // apm.captureError(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`APM-Demo app listening on http://localhost:${PORT}`);
});
