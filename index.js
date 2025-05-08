const express = require('express');
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

async function fetchData(id) {
  console.log('fetchData → processData');
  const data = await dbLookup(id);
  return processData(data);
}

function dbLookup(id) {
  console.log('dbLookup → returns a Promise');
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Widget' }), 50);
  });
}

function processData(data) {
  console.log('processData → validateData');
  return validateData(data);
}

function validateData(data) {
  console.log('validateData → deeperCalculation');
  if (!data || !data.id) {
    throw new Error(`Invalid data payload: ${JSON.stringify(data)}`);
  }
  return deeperCalculation(data);
}

function deeperCalculation(data) {
  console.log('deeperCalculation → anotherLayer');
  return anotherLayer(data.id);
}

function anotherLayer(id) {
  console.log('anotherLayer → throwing Error');
  throw new Error(`Processing failed for id=${id}`);
}

app.use((err, req, res, next) => {
  // apm.captureError(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`APM-Demo app listening on http://localhost:${PORT}`);
});
