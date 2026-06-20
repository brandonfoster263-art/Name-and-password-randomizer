import { randomInt } from 'node:crypto';

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

function pick(list) {
  return list[randomInt(list.length)];
}

export function generateRealisticName() {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

export function generateUsername() {
  const number = randomInt(1000);
  return `${pick(ADJECTIVES)}${pick(NOUNS)}${number}`;
}
