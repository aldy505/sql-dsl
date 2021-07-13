const {Client} = require('pg');
const {sql} = require('sql-dsl');

async function main() {
  try {
    const client = new Client({
      connectionString: 'postgresql://postgres:password@localhost:5432/myapp',
    });
    const query = sql`INSERT INTO users (name, email, password) VALUES (${'Foo Baar'}, ${'foo@bar.com'}, ${'super secure'})`;
    const insert = await client.query(query.sql, query.values);
    console.log(insert);
  } catch (error) {
    console.error(error);
  }
}

main();
