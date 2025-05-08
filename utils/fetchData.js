import { processData } from "./processData.js";

export async function fetchData(id) {
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
