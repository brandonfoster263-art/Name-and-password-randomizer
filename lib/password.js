import { randomInt } from 'node:crypto';

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
};

export function generatePassword({
  length = 16,
  upper = true,
  lower = true,
  digits = true,
  symbols = true,
} = {}) {
  const categories = [];
  if (upper) categories.push(CHARSETS.upper);
  if (lower) categories.push(CHARSETS.lower);
  if (digits) categories.push(CHARSETS.digits);
  if (symbols) categories.push(CHARSETS.symbols);

  if (categories.length === 0) {
    throw new Error('At least one character category must be enabled');
  }
  if (length < categories.length) {
    throw new Error(`Length must be at least ${categories.length} to include every selected category`);
  }

  const pool = categories.join('');
  const chars = categories.map((set) => set[randomInt(set.length)]);
  for (let i = chars.length; i < length; i++) {
    chars.push(pool[randomInt(pool.length)]);
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}
