import { randomInt } from 'node:crypto';

// Word lists stay small on purpose. Uniqueness at scale comes from
// multiplying list sizes by SUFFIX_RANGE below, not from storing
// millions of literal strings. Keep this file's lists identical to
// the ones in app.js (browser build has no module loader for file://).
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

// Each generated name carries a random 6-digit suffix, so the pool of
// unique names is listLength^2 * SUFFIX_RANGE rather than just the
// word-list size. This reaches well past 50 million combinations
// without storing millions of literal strings.
const SUFFIX_RANGE = 1_000_000;
const SUFFIX_DIGITS = 6;

export const REALISTIC_NAME_POOL_SIZE = FIRST_NAMES.length * LAST_NAMES.length * SUFFIX_RANGE;
export const USERNAME_POOL_SIZE = ADJECTIVES.length * NOUNS.length * SUFFIX_RANGE;

// Re-exported so lib/password.js can build memorable passphrases from
// the same word lists instead of duplicating them.
export { ADJECTIVES, NOUNS };

function pick(list) {
  return list[randomInt(list.length)];
}

function randomSuffix() {
  return String(randomInt(SUFFIX_RANGE)).padStart(SUFFIX_DIGITS, '0');
}

export function generateRealisticName() {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const suffix = randomSuffix();
  if (randomInt(3) === 0) {
    return `${first} "${pick(NICKNAMES)}" ${last} #${suffix}`;
  }
  return `${first} ${last} #${suffix}`;
}

// Several templates rotate through so usernames read as distinct styles
// rather than always the same AdjectiveNoun+digits shape. Every template
// still ends with the 6-digit suffix, so the pool-size math below holds.
const USERNAME_TEMPLATES = [
  ({ adjective, noun, suffix }) => `${adjective}${noun}${suffix}`,
  ({ adjective, noun, suffix }) => `${adjective}_${noun}_${suffix}`,
  ({ title, adjective, noun, suffix }) => `${title}${adjective}${noun}${suffix}`,
  ({ adjective, noun, flair, suffix }) => `${adjective}${noun}${flair}${suffix}`,
  ({ adjective, noun, suffix }) => `xX${adjective}${noun}Xx${suffix}`,
];

export function generateUsername() {
  const context = {
    adjective: pick(ADJECTIVES),
    noun: pick(NOUNS),
    title: pick(TITLES),
    flair: pick(FLAIRS),
    suffix: randomSuffix(),
  };
  return pick(USERNAME_TEMPLATES)(context);
}
