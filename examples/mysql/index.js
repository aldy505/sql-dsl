const mysql = require('mysql');
const {sql} = require('sql-dsl');

async function main() {
  const connection = mysql.createConnection('mysql://root:password@localhost:3306/myapp');
  connection.connect();
  const query = sql`INSERT INTO users (name, email, password) VALUES (${'Foo Baar'}, ${'foo@bar.com'}, ${'super secure'})`.formatQuestion();
  connection.query(query.sql, query.values, (error, result, fields) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(result);
    console.log(fields);
  });
}

main();
