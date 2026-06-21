import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generatePassword, generatePassphrase } from '../lib/password.js';

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

test('passphrase has the requested word count and a number+symbol suffix', () => {
  const phrase = generatePassphrase({ words: 4 });
  const parts = phrase.split('-');
  assert.equal(parts.length, 5);
  assert.match(parts[4], /^\d{2}[!@#$%&*]$/);
});

test('passphrase words are distinct', () => {
  const phrase = generatePassphrase({ words: 5 });
  const words = phrase.split('-').slice(0, -1);
  assert.equal(new Set(words).size, words.length);
});

test('passphrase throws when word count is out of range', () => {
  assert.throws(() => generatePassphrase({ words: 1 }));
  assert.throws(() => generatePassphrase({ words: 9999 }));
});
