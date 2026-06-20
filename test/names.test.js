import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRealisticName, generateUsername } from '../lib/names.js';

test('realistic name has a first and last part', () => {
  const name = generateRealisticName();
  assert.equal(name.split(' ').length, 2);
});

test('username ends with a number suffix', () => {
  const name = generateUsername();
  assert.match(name, /\d+$/);
});
