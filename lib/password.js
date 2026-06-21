import { randomInt } from 'node:crypto';
import { ADJECTIVES, NOUNS } from './names.js';

const PASSPHRASE_WORDS = [...ADJECTIVES, ...NOUNS];
const PASSPHRASE_SYMBOLS = '!@#$%&*';

export const PASSPHRASE_WORD_POOL_SIZE = PASSPHRASE_WORDS.length;

function pickUniqueWords(count) {
  if (count < 2) throw new Error('words must be at least 2');
  if (count > PASSPHRASE_WORDS.length) {
    throw new Error(`words must be at most ${PASSPHRASE_WORDS.length}`);
  }
  const used = new Set();
  const chosen = [];
  while (chosen.length < count) {
    const index = randomInt(PASSPHRASE_WORDS.length);
    if (used.has(index)) continue;
    used.add(index);
    chosen.push(PASSPHRASE_WORDS[index]);
  }
  return chosen;
}

// A handful of real words is far easier to remember than jumbled
// characters, and still resists guessing: 4 distinct words from this
// list plus a 2-digit number and a symbol gives roughly 38 bits of
// entropy, comparable to an 6-7 character fully-random password.
export function generatePassphrase({ words = 4 } = {}) {
  const chosen = pickUniqueWords(words);
  const number = String(randomInt(100)).padStart(2, '0');
  const symbol = PASSPHRASE_SYMBOLS[randomInt(PASSPHRASE_SYMBOLS.length)];
  return `${chosen.join('-')}-${number}${symbol}`;
}

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
