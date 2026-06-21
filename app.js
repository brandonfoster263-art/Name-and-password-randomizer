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

// Keep these word lists identical to lib/names.js. Uniqueness at scale
// comes from multiplying list sizes by SUFFIX_RANGE below, not from
// storing millions of literal strings.
const FIRST_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Sydney', 'Reese', 'Harper', 'Skyler', 'Dakota', 'Emerson', 'Rowan',
  'Finley', 'Hayden', 'Peyton', 'Charlie', 'Sawyer', 'Elliot', 'Blake',
  'Cameron', 'Drew', 'Jamie', 'Kendall', 'Lane', 'Marley', 'Nico', 'Parker',
  'Adrian', 'Bailey', 'Carmen', 'Dana', 'Eden', 'Frances', 'Gabriel',
  'Hunter', 'Ivy', 'Jules', 'Kai', 'Logan', 'Micah', 'Noel', 'Oakley',
  'Phoenix', 'Quincy', 'Remy', 'Sage', 'Tatum', 'Aubrey', 'Brett', 'Cody',
  'Devon', 'Ellis', 'Greer', 'Holland', 'Indigo', 'Jett', 'Kyler',
];

const LAST_NAMES = [
  'Mitchell', 'Bennett', 'Carter', 'Diaz', 'Edwards', 'Foster', 'Gray',
  'Hughes', 'Ingram', 'Jenkins', 'Kennedy', 'Lawson', 'Mercer', 'Nolan',
  'Ortiz', 'Porter', 'Quinlan', 'Reyes', 'Sanders', 'Tran', 'Underwood',
  'Vance', 'Walsh', 'Xiong', 'Young', 'Zimmer', 'Abbott', 'Bishop',
  'Coleman', 'Dawson', 'Ellison', 'Fairweather', 'Gallagher', 'Hartley',
  'Iverson', 'Jorgensen', 'Kaplan', 'Lindqvist', 'Monroe', 'Norris',
  'Osgood', 'Pemberton', 'Quintero', 'Rourke', 'Sterling', 'Thatcher',
  'Upton', 'Vasquez', 'Whitfield', 'Yamamoto', 'Anders', 'Brewster',
  'Castellan', 'Drummond', 'Eastman', 'Falkner', 'Goodwin', 'Harrington',
  'Isaacs', 'Jennings',
];

// Quoted nicknames give "realistic" names some swagger, e.g. Jordan "Ace" Mitchell.
const NICKNAMES = [
  'Ace', 'Maverick', 'Doc', 'Ghost', 'Blaze', 'Rebel', 'Tank', 'Rocket',
  'Shadow', 'Lucky', 'Razor', 'Echo', 'Sparky', 'Domino', 'Wrench', 'Tiny',
  'Slick', 'Breeze', 'Hawkeye', 'Nomad', 'Diesel', 'Switch', 'Static', 'Marbles',
];

// Username flavor words: TITLES go in front, FLAIRS tack on the end, both
// rotated in by USERNAME_TEMPLATES below so usernames aren't just a flat
// AdjectiveNoun concatenation.
const TITLES = [
  'The', 'Captain', 'Agent', 'Doctor', 'Professor', 'Master', 'General',
  'Commander', 'Baron', 'Admiral',
];

const FLAIRS = [
  'Prime', 'OG', 'Reloaded', 'Unleashed', 'Zero', 'MKII', 'Royale',
  'Supreme', 'Ultra', 'Maximus', 'Override', 'Ascendant',
];

const ADJECTIVES = [
  'Swift', 'Brave', 'Silent', 'Clever', 'Mighty', 'Lucky', 'Fuzzy', 'Bold',
  'Quick', 'Wild', 'Crimson', 'Frosty', 'Golden', 'Rapid', 'Stormy',
  'Sneaky', 'Jolly', 'Gritty', 'Radiant', 'Nimble', 'Electric', 'Shadowy',
  'Blazing', 'Frozen', 'Glowing', 'Howling', 'Iron', 'Jagged', 'Keen',
  'Lively', 'Misty', 'Noble', 'Obsidian', 'Prismatic', 'Quiet', 'Roaring',
  'Scarlet', 'Tangled', 'Untamed', 'Vivid',
];

// Mixes several themes so a generated username isn't always an animal
// name. Keep categories roughly balanced when adding new words.
const NOUNS = [
  // Animals
  'Falcon', 'Tiger', 'Panther', 'Otter', 'Wolf', 'Raven', 'Cobra', 'Lynx',
  'Badger', 'Hawk', 'Dragon', 'Viper', 'Bear', 'Eagle', 'Shark', 'Fox',
  'Mantis', 'Jaguar', 'Heron', 'Jackal', 'Kestrel', 'Lion', 'Mongoose',
  'Newt', 'Orca', 'Puma', 'Quokka', 'Rhino', 'Stallion', 'Toucan',
  'Urchin', 'Vulture', 'Walrus', 'Yak', 'Zebra', 'Antelope', 'Bison',
  // Cosmic
  'Nebula', 'Quasar', 'Meteor', 'Galaxy', 'Eclipse', 'Aurora', 'Phoenix',
  'Photon', 'Pulsar', 'Vortex', 'Nova', 'Orbit', 'Starlight', 'Cosmos',
  'Meteorite', 'Supernova', 'Comet',
  // Nature & weather
  'Storm', 'Thunder', 'Ember', 'Glacier', 'Canyon', 'Summit', 'Tundra',
  'Horizon', 'Cascade', 'Boulder', 'Cyclone', 'Blizzard', 'Volcano',
  'Tempest', 'Monsoon',
  // Myth & legend
  'Golem', 'Specter', 'Oracle', 'Titan', 'Wraith', 'Phantom', 'Sorcerer',
  'Paladin', 'Valkyrie', 'Behemoth',
  // Tech
  'Cipher', 'Vector', 'Pixel', 'Circuit', 'Nexus', 'Quantum', 'Byte',
  'Signal', 'Matrix', 'Glitch', 'Protocol', 'Firewall', 'Beacon',
  'Catalyst', 'Anomaly',
];

const SUFFIX_RANGE = 1_000_000;
const SUFFIX_DIGITS = 6;

function randomSuffix() {
  return String(secureRandomInt(SUFFIX_RANGE)).padStart(SUFFIX_DIGITS, '0');
}

function generateRealisticName() {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const suffix = randomSuffix();
  if (secureRandomInt(3) === 0) {
    return `${first} "${pick(NICKNAMES)}" ${last} #${suffix}`;
  }
  return `${first} ${last} #${suffix}`;
}

// Several templates rotate through so usernames read as distinct styles
// rather than always the same AdjectiveNoun+digits shape. Every template
// still ends with the 6-digit suffix.
const USERNAME_TEMPLATES = [
  ({ adjective, noun, suffix }) => `${adjective}${noun}${suffix}`,
  ({ adjective, noun, suffix }) => `${adjective}_${noun}_${suffix}`,
  ({ title, adjective, noun, suffix }) => `${title}${adjective}${noun}${suffix}`,
  ({ adjective, noun, flair, suffix }) => `${adjective}${noun}${flair}${suffix}`,
  ({ adjective, noun, suffix }) => `xX${adjective}${noun}Xx${suffix}`,
];

function generateUsername() {
  const context = {
    adjective: pick(ADJECTIVES),
    noun: pick(NOUNS),
    title: pick(TITLES),
    flair: pick(FLAIRS),
    suffix: randomSuffix(),
  };
  return pick(USERNAME_TEMPLATES)(context);
}

const PASSPHRASE_WORDS = [...ADJECTIVES, ...NOUNS];
const PASSPHRASE_SYMBOLS = '!@#$%&*';

// One of these always closes out the word chain, turning a flat list of
// words into a mini battle cry, e.g. Crimson-Falcon-Quantum-Conquers-42!
const ACTION_WORDS = [
  'Strikes', 'Soars', 'Ignites', 'Unleashed', 'Charges', 'Erupts',
  'Ascends', 'Prowls', 'Sparks', 'Roars', 'Smashes', 'Blazes',
  'Conquers', 'Awakens', 'Reigns',
];

function pickUniqueWords(count) {
  if (count < 2) throw new Error('words must be at least 2');
  if (count > PASSPHRASE_WORDS.length) {
    throw new Error(`words must be at most ${PASSPHRASE_WORDS.length}`);
  }
  const used = new Set();
  const chosen = [];
  while (chosen.length < count) {
    const index = secureRandomInt(PASSPHRASE_WORDS.length);
    if (used.has(index)) continue;
    used.add(index);
    chosen.push(PASSPHRASE_WORDS[index]);
  }
  return chosen;
}

function generatePassphrase({ words = 4 } = {}) {
  const chosen = pickUniqueWords(words);
  const action = pick(ACTION_WORDS);
  const number = String(secureRandomInt(100)).padStart(2, '0');
  const symbol = PASSPHRASE_SYMBOLS[secureRandomInt(PASSPHRASE_SYMBOLS.length)];
  return `${chosen.join('-')}-${action}-${number}${symbol}`;
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

function readRandomPasswordOptions() {
  return {
    length: parseInt(document.getElementById('password-length').value, 10),
    upper: document.getElementById('opt-upper').checked,
    lower: document.getElementById('opt-lower').checked,
    digits: document.getElementById('opt-digits').checked,
    symbols: document.getElementById('opt-symbols').checked,
  };
}

function generatePasswordForCurrentStyle() {
  const style = document.getElementById('password-style').value;
  if (style === 'random') return generatePassword(readRandomPasswordOptions());
  const words = parseInt(document.getElementById('password-words').value, 10);
  return generatePassphrase({ words });
}

function updatePasswordStyleControls() {
  const isRandom = document.getElementById('password-style').value === 'random';
  document.getElementById('random-controls').classList.toggle('hidden', !isRandom);
  document.getElementById('passphrase-controls').classList.toggle('hidden', isRandom);
}

document.getElementById('password-style').addEventListener('change', updatePasswordStyleControls);
updatePasswordStyleControls();

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
    document.getElementById('password-output').value = generatePasswordForCurrentStyle();
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

document.getElementById('generate-both').addEventListener('click', () => {
  const errorEl = document.getElementById('password-error');
  errorEl.textContent = '';
  document.getElementById('name-output').value = generateNameForCurrentStyle();
  try {
    document.getElementById('password-output').value = generatePasswordForCurrentStyle();
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

function randomRange(min, max) {
  return min + secureRandomInt(max - min + 1);
}

const CHAOS_LEVELS = {
  calm: {
    nameStyle: () => 'realistic',
    words: () => 3,
  },
  wild: {
    nameStyle: () => 'realistic',
    words: () => 4,
  },
  crazy: {
    nameStyle: () => 'username',
    words: () => 5,
  },
  chaos: {
    nameStyle: () => (secureRandomInt(2) === 0 ? 'realistic' : 'username'),
    words: () => randomRange(4, 6),
  },
};

function applyChaosLevel(level) {
  const preset = CHAOS_LEVELS[level];

  document.getElementById('name-style').value = preset.nameStyle();
  document.getElementById('password-style').value = 'passphrase';
  document.getElementById('password-words').value = preset.words();
  updatePasswordStyleControls();

  document.getElementById('name-output').value = generateNameForCurrentStyle();
  document.getElementById('password-error').textContent = '';
  document.getElementById('password-output').value = generatePasswordForCurrentStyle();

  document.querySelectorAll('.chaos-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.level === level);
  });

  if (level === 'chaos') {
    [document.getElementById('name-card'), document.getElementById('password-card')].forEach((card) => {
      card.classList.remove('shake');
      void card.offsetWidth; // restart animation
      card.classList.add('shake');
    });
  }
}

document.querySelectorAll('.chaos-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyChaosLevel(btn.dataset.level));
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
