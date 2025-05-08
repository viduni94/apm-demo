export function processData(data) {
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
