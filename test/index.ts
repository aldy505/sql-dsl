import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {sql} from '../src/index';

test('should be able to parse select query', () => {
  const query = sql`select * from 'users' where email = ${'example@mail.com'}`;
  assert.equal(query.sql, 'select * from \'users\' where email = $1');
  assert.equal(query.values, ['example@mail.com']);
});

test('should be able to parse insert query', () => {
  const query = sql`insert into users (name, age, profession) values (${'Jonas'}, ${21}, ${'jobless'})`;
  assert.equal(query.sql, 'insert into users (name, age, profession) values ($1, $2, $3)');
  assert.equal(query.values, ['Jonas', 21, 'jobless']);
});

test('should be able to parse to question marks', () => {
  const query = sql`insert into users (name, age, profession) values (${'Jonas'}, ${21}, ${'jobless'})`.formatQuestion();
  assert.equal(query.sql, 'insert into users (name, age, profession) values (?, ?, ?)');
  assert.equal(query.values, ['Jonas', 21, 'jobless']);
});

test('should be able to parse to colons', () => {
  const query = sql`insert into users (name, age, profession) values (${'Jonas'}, ${21}, ${'jobless'})`.formatColon();
  assert.equal(query.sql, 'insert into users (name, age, profession) values (:1, :2, :3)');
  assert.equal(query.values, ['Jonas', 21, 'jobless']);
});

test('should be able to parse to @p', () => {
  const query = sql`insert into users (name, age, profession) values (${'Jonas'}, ${21}, ${'jobless'})`.formatAtP();
  assert.equal(query.sql, 'insert into users (name, age, profession) values (@p1, @p2, @p3)');
  assert.equal(query.values, ['Jonas', 21, 'jobless']);
});

test.run();
