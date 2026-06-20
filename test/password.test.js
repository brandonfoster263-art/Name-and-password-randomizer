import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generatePassword } from '../lib/password.js';

test('generates a password of the requested length', () => {
  const pw = generatePassword({ length: 12 });
  assert.equal(pw.length, 12);
});

test('respects disabled character categories', () => {
  const pw = generatePassword({ length: 12, upper: false, symbols: false });
  assert.ok(!/[A-Z]/.test(pw));
  assert.ok(!/[!@#$%^&*()\-_=+[\]{};:,.<>?]/.test(pw));
});

test('throws when all categories are disabled', () => {
  assert.throws(() =>
    generatePassword({ upper: false, lower: false, digits: false, symbols: false })
  );
});

test('throws when length is too small for selected categories', () => {
  assert.throws(() => generatePassword({ length: 1 }));
});
