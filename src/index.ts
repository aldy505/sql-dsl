export interface SqlObject {
  sql: string
  values: TemplateStringsArray
  formatQuestion?: () => SqlObject
  formatColon?: () => SqlObject
  formatAtP?: () => SqlObject
}

/**
 * Simple template literal to create a SQL query object
 * @returns {SqlObject} An object of your SQL and arguments
 * @example
 * const query = sql`select * from users where email = ${`something@mail.com`}`
 * // query.sql = 'select * from users where email = $1'
 * // query.values = ['something@mail.com']
 *
 * // Convert to MySQL question mark notation:
 * const mysql = query.formatQuestion()
 * // mysql.sql = 'select * from users where email = ?'
 *
 * // Convert to colon notation:
 * const colon = query.formatColon()
 * // colon.sql = 'select * from users where email = :1'
 */
export function sql(string: string[], ...params: TemplateStringsArray): SqlObject {
  const sql = string.map((v, i) => (string.length - 1 === i) ? v : `${v}$${i + 1}`).join('');

  function formatQuestion(): SqlObject {
    return {
      sql: sql.replace(/\$[0-Infinity]/gi, '?'),
      values: params,
    };
  }

  function formatColon(): SqlObject {
    return {
      sql: sql.replace(/\$/gi, ':'),
      values: params,
    };
  }

  function formatAtP(): SqlObject {
    return {
      sql: sql.replace(/\$/gi, '@p'),
      values: params,
    };
  }

  return {
    sql,
    values: params,
    formatQuestion,
    formatColon,
    formatAtP,
  };
}
