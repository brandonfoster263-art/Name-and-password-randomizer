#!/usr/bin/env node
import { generateRealisticName, generateUsername } from '../lib/names.js';
import { generatePassword } from '../lib/password.js';

const HELP = `randgen - generate random names and passwords

Usage:
  randgen name [--style realistic|username] [--count N]
  randgen password [--length N] [--no-upper] [--no-lower] [--no-digits] [--no-symbols] [--count N]
  randgen both [name & password options combined]
  randgen --help

Examples:
  randgen name --style username --count 3
  randgen password --length 20 --no-symbols
  randgen both
`;

const args = process.argv.slice(2);
const command = args[0];

function getFlagValue(flag, fallback) {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx === args.length - 1) return fallback;
  return args[idx + 1];
}

function hasFlag(flag) {
  return args.includes(flag);
}

function buildPasswordOptions() {
  return {
    length: parseInt(getFlagValue('--length', '16'), 10),
    upper: !hasFlag('--no-upper'),
    lower: !hasFlag('--no-lower'),
    digits: !hasFlag('--no-digits'),
    symbols: !hasFlag('--no-symbols'),
  };
}

function generateName() {
  const style = getFlagValue('--style', 'realistic');
  if (style === 'username') return generateUsername();
  if (style === 'realistic') return generateRealisticName();
  throw new Error(`Unknown --style "${style}". Use "realistic" or "username".`);
}

function run() {
  if (!command || command === '--help' || command === '-h') {
    console.log(HELP);
    return;
  }

  const count = parseInt(getFlagValue('--count', '1'), 10);

  for (let i = 0; i < count; i++) {
    if (command === 'name') {
      console.log(generateName());
    } else if (command === 'password') {
      console.log(generatePassword(buildPasswordOptions()));
    } else if (command === 'both') {
      console.log(`Name: ${generateName()}`);
      console.log(`Password: ${generatePassword(buildPasswordOptions())}`);
    } else {
      console.error(`Unknown command "${command}".\n`);
      console.log(HELP);
      process.exitCode = 1;
      return;
    }
  }
}

run();
