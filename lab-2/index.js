const Cheff = require('./Cheff');
const fs = require('fs');

const data = fs.readFileSync('./codes.txt', 'utf-8');
const codes = data.split('\n\n');

// Manual approach
const ciphertext = 'E39DF7DFAE39E36DFDE39E3ADF8E39E36E38E39E36E36E39E3ADFDE38E36DF8E39E3ADF8E39E36DFDE39DFCDF6DF4E36DFCE3ADFBE36E39E36DFCE39E36DF9E39E36E38E38E36DF8E39E3ADF8E39E36DFDE39DFCDF6E39E36DFDE39E3ADFBE38E36DF8E39DFCDF7E39DFCDF9E39DFCDF5E39E3AE38E39E3ADFCE39E36E38';
const cheff = new Cheff(ciphertext);
const result = cheff
  .fromHex()
  .toBase64()
  .fromHex()
  .fromHex()
  .toBase64()
  .fromHex()
  .toUTF8()
  .toString();

console.log(result);

// Automated approach
codes.forEach((string) => {
  const cheff = new Cheff(string);
  const result = cheff.auto();

  console.log(result.toString());
  console.log('\n');
});