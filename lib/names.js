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

const ADJECTIVES = [
  'Swift', 'Brave', 'Silent', 'Clever', 'Mighty', 'Lucky', 'Fuzzy', 'Bold',
  'Quick', 'Wild', 'Crimson', 'Frosty', 'Golden', 'Rapid', 'Stormy',
  'Sneaky', 'Jolly', 'Gritty', 'Radiant', 'Nimble', 'Electric', 'Shadowy',
  'Blazing', 'Frozen', 'Glowing', 'Howling', 'Iron', 'Jagged', 'Keen',
  'Lively', 'Misty', 'Noble', 'Obsidian', 'Prismatic', 'Quiet', 'Roaring',
  'Scarlet', 'Tangled', 'Untamed', 'Vivid',
];

const NOUNS = [
  'Falcon', 'Tiger', 'Comet', 'Panther', 'Otter', 'Phoenix', 'Wolf',
  'Raven', 'Cobra', 'Lynx', 'Badger', 'Hawk', 'Dragon', 'Viper', 'Bear',
  'Eagle', 'Shark', 'Fox', 'Mantis', 'Jaguar', 'Heron', 'Imp', 'Jackal',
  'Kestrel', 'Lion', 'Mongoose', 'Newt', 'Orca', 'Puma', 'Quokka', 'Rhino',
  'Stallion', 'Toucan', 'Urchin', 'Vulture', 'Walrus', 'Yak', 'Zebra',
  'Antelope', 'Bison',
];

// Each generated name carries a random 6-digit suffix, so the pool of
// unique names is listLength^2 * SUFFIX_RANGE rather than just the
// word-list size. This reaches well past 50 million combinations
// without storing millions of literal strings.
const SUFFIX_RANGE = 1_000_000;
const SUFFIX_DIGITS = 6;

export const REALISTIC_NAME_POOL_SIZE = FIRST_NAMES.length * LAST_NAMES.length * SUFFIX_RANGE;
export const USERNAME_POOL_SIZE = ADJECTIVES.length * NOUNS.length * SUFFIX_RANGE;

function pick(list) {
  return list[randomInt(list.length)];
}

function randomSuffix() {
  return String(randomInt(SUFFIX_RANGE)).padStart(SUFFIX_DIGITS, '0');
}

export function generateRealisticName() {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)} #${randomSuffix()}`;
}

export function generateUsername() {
  return `${pick(ADJECTIVES)}${pick(NOUNS)}${randomSuffix()}`;
}
