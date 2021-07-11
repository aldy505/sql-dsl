# SQL DSN for your Node App

Based on an idea from [@ronnygunawan](https://github.com/ronnygunawan). This was supposed to be a challenge for someone else, but I thought, why not? Lol.

As always:
* Supports CJS and ESM
* Built-in typings
* No external dependencies

```bash
npm install sql-dsn
```

## What this does?

This outputs simple SQL query & argument object from your template literal string.

```js
import { sql } from 'sql-dsn'

const query = sql`INSERT INTO users (name, email, age) VALUES (${`Thomas Worgdjik`}, ${`thom@thunder.zn`}, ${30})`

// {
//   sql: 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3)',
//   values: ['Thomas Worgdjik', 'thom@thunder.zn', 30]
// }

// Oh, you work with MySQL instead of Postgres? Sure!

const postgres = query.formatQuestion()

// {
//   sql: 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
//   values: ['Thomas Worgdjik', 'thom@thunder.zn', 30]
// }

// More elegant way to do that is this:
const query = sql`INSERT INTO users (name, email, age) VALUES (${`Thomas Worgdjik`}, ${`thom@thunder.zn`}, ${30})`.formatQuestion()

// Your database work with colon notation? Something like :1 :2 etc? No problem.

const colon = query.formatColon()

// {
//   sql: 'INSERT INTO users (name, email, age) VALUES (:1, :2, :3)',
//   values: ['Thomas Worgdjik', 'thom@thunder.zn', 30]
// }

// Your database work with @p notation? Yeah, we can do that.

const atp = query.formatAtP()

// {
//   sql: 'INSERT INTO users (name, email, age) VALUES (@p1, @p2, @p3)',
//   values: ['Thomas Worgdjik', 'thom@thunder.zn', 30]
// }
```

Want more features? Open something up on [issues](https://github.com/aldy505/sql-dsn).