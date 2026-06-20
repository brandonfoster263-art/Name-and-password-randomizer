// Browser port of lib/names.js and lib/password.js, using crypto.getRandomValues
// instead of Node's crypto.randomInt.

function secureRandomInt(maxExclusive) {
  if (maxExclusive <= 0) throw new Error('max must be positive');
  const bytesNeeded = Math.max(1, Math.ceil(Math.log2(maxExclusive) / 8));
  const maxValid = Math.floor(256 ** bytesNeeded / maxExclusive) * maxExclusive;
  let value;
  do {
    const buf = new Uint8Array(bytesNeeded);
    crypto.getRandomValues(buf);
    value = buf.reduce((acc, byte, i) => acc + byte * 256 ** i, 0);
  } while (value >= maxValid);
  return value % maxExclusive;
}

function pick(list) {
  return list[secureRandomInt(list.length)];
}

const FIRST_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Sydney', 'Reese', 'Harper', 'Skyler', 'Dakota', 'Emerson', 'Rowan',
  'Finley', 'Hayden', 'Peyton', 'Charlie', 'Sawyer', 'Elliot', 'Blake',
  'Cameron', 'Drew', 'Jamie', 'Kendall', 'Lane', 'Marley', 'Nico', 'Parker',
];

const LAST_NAMES = [
  'Mitchell', 'Bennett', 'Carter', 'Diaz', 'Edwards', 'Foster', 'Gray',
  'Hughes', 'Ingram', 'Jenkins', 'Kennedy', 'Lawson', 'Mercer', 'Nolan',
  'Ortiz', 'Porter', 'Quinlan', 'Reyes', 'Sanders', 'Tran', 'Underwood',
  'Vance', 'Walsh', 'Xiong', 'Young', 'Zimmer', 'Abbott', 'Bishop',
  'Coleman', 'Dawson',
];

const ADJECTIVES = [
  'Swift', 'Brave', 'Silent', 'Clever', 'Mighty', 'Lucky', 'Fuzzy', 'Bold',
  'Quick', 'Wild', 'Crimson', 'Frosty', 'Golden', 'Rapid', 'Stormy',
  'Sneaky', 'Jolly', 'Gritty', 'Radiant', 'Nimble',
];

const NOUNS = [
  'Falcon', 'Tiger', 'Comet', 'Panther', 'Otter', 'Phoenix', 'Wolf',
  'Raven', 'Cobra', 'Lynx', 'Badger', 'Hawk', 'Dragon', 'Viper', 'Bear',
  'Eagle', 'Shark', 'Fox', 'Mantis', 'Jaguar',
];

function generateRealisticName() {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

function generateUsername() {
  return `${pick(ADJECTIVES)}${pick(NOUNS)}${secureRandomInt(1000)}`;
}

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
};

function generatePassword({ length, upper, lower, digits, symbols }) {
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
  const chars = categories.map((set) => set[secureRandomInt(set.length)]);
  for (let i = chars.length; i < length; i++) {
    chars.push(pool[secureRandomInt(pool.length)]);
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}

function readPasswordOptions() {
  return {
    length: parseInt(document.getElementById('password-length').value, 10),
    upper: document.getElementById('opt-upper').checked,
    lower: document.getElementById('opt-lower').checked,
    digits: document.getElementById('opt-digits').checked,
    symbols: document.getElementById('opt-symbols').checked,
  };
}

function generateNameForCurrentStyle() {
  const style = document.getElementById('name-style').value;
  return style === 'username' ? generateUsername() : generateRealisticName();
}

document.getElementById('generate-name').addEventListener('click', () => {
  document.getElementById('name-output').value = generateNameForCurrentStyle();
});

document.getElementById('generate-password').addEventListener('click', () => {
  const errorEl = document.getElementById('password-error');
  errorEl.textContent = '';
  try {
    document.getElementById('password-output').value = generatePassword(readPasswordOptions());
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

document.getElementById('generate-both').addEventListener('click', () => {
  const errorEl = document.getElementById('password-error');
  errorEl.textContent = '';
  document.getElementById('name-output').value = generateNameForCurrentStyle();
  try {
    document.getElementById('password-output').value = generatePassword(readPasswordOptions());
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target.value) return;
    await navigator.clipboard.writeText(target.value);
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = original), 1000);
  });
});
