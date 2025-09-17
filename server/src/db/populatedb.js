const { Client } = require('pg');
const path = require('path');
const { seedCategories } = require('./seeds/seedCategories');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });

  await client.connect();

  await seedCategories(client);

  await client.end();
}

main();
