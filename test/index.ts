import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {sql} from '../src/index';

test('should be able to parse select query', () => {
  const query = sql`select * from 'users' where email = ${'example@mail.com'}`;
  assert.equal(query.sql, 'select * from \'users\' where email = $1');
  assert.equal(query.values, ['example@mail.com']);
});

test('should be able to parse insert query', () => {
  const query = sql`insert into users (name, age, profession) values (${'Jonas'}, ${21}, ${'pengangguran'})`;
  assert.equal(query.sql, 'insert into users (name, age, profession) values ($1, $2, $3)');
  assert.equal(query.values, ['Jonas', 21, 'pengangguran']);
});

test('should be able to parse to question marks', () => {
  const query = sql`select * from 'users' where email = ${'example@mail.com'}`.formatQuestion();
  assert.equal(query, {sql: 'select * from \'users\' where email = ?', values: ['example@mail.com']});
});

test('should be able to parse to colons', () => {
  const query = sql`select * from 'users' where email = ${'example@mail.com'}`.formatColon();
  assert.equal(query, {sql: 'select * from \'users\' where email = :1', values: ['example@mail.com']});
});

test('should be able to parse to @p', () => {
  const query = sql`select * from 'users' where email = ${'example@mail.com'}`.formatAtP();
  assert.equal(query, {sql: 'select * from \'users\' where email = @p1', values: ['example@mail.com']});
});

test.run();
