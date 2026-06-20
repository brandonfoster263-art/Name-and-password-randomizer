import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateRealisticName,
  generateUsername,
  REALISTIC_NAME_POOL_SIZE,
  USERNAME_POOL_SIZE,
} from '../lib/names.js';

test('realistic name has a first, last, and 6-digit suffix', () => {
  const name = generateRealisticName();
  assert.match(name, /^[A-Za-z]+ [A-Za-z]+ #\d{6}$/);
});

test('username ends with a 6-digit suffix', () => {
  const name = generateUsername();
  assert.match(name, /\d{6}$/);
});

test('name pools each support at least 50 million unique combinations', () => {
  assert.ok(REALISTIC_NAME_POOL_SIZE >= 50_000_000);
  assert.ok(USERNAME_POOL_SIZE >= 50_000_000);
});
