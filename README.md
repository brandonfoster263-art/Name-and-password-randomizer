# Name & Password Randomizer

A small dependency-free Node.js CLI that generates random names and secure passwords.

Each name carries a random 6-digit suffix, which multiplies the word lists into
a pool of several billion unique names per style — far more than the requested
50 million — without storing a giant list of literal names. Usernames pull from
animal, cosmic, nature, myth, and tech word categories, so they aren't always
animal-themed.

Passwords default to a **memorable passphrase** (real words joined by hyphens,
e.g. `Crimson-Nebula-Falcon-Quantum-82!`) instead of jumbled random characters.
A fully-random character style is still available via `--pw-style random`.

## Requirements

- Node.js 18+

## Usage

```sh
node bin/cli.js name [--style realistic|username] [--count N]
node bin/cli.js password [--pw-style passphrase|random] [--words N] [--length N] [--no-upper] [--no-lower] [--no-digits] [--no-symbols] [--count N]
node bin/cli.js both [name & password options combined]
```

Or, after `npm link`, use the `randgen` command directly:

```sh
randgen name --style username --count 3
randgen password --words 5
randgen password --pw-style random --length 20 --no-symbols
randgen both
```

## Examples

```sh
$ node bin/cli.js name
Jordan Mitchell #048213

$ node bin/cli.js name --style username
QuantumNebula048213

$ node bin/cli.js password
Crimson-Nebula-Falcon-Quantum-82!

$ node bin/cli.js password --pw-style random --length 20
xT8!kLp2@qZ9vR4#mN7$

$ node bin/cli.js both --style username
Name: BraveOtter719042
Password: Storm-Oracle-Vivid-Byte-14&
```

## Testing

```sh
npm test
```
