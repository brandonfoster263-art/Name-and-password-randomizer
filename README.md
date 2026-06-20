# Name & Password Randomizer

A small dependency-free Node.js CLI that generates random names and secure passwords.

Each name carries a random 6-digit suffix, which multiplies the word lists into
a pool of several billion unique names per style — far more than the requested
50 million — without storing a giant list of literal names.

## Requirements

- Node.js 18+

## Usage

```sh
node bin/cli.js name [--style realistic|username] [--count N]
node bin/cli.js password [--length N] [--no-upper] [--no-lower] [--no-digits] [--no-symbols] [--count N]
node bin/cli.js both [name & password options combined]
```

Or, after `npm link`, use the `randgen` command directly:

```sh
randgen name --style username --count 3
randgen password --length 20 --no-symbols
randgen both
```

## Examples

```sh
$ node bin/cli.js name
Jordan Mitchell #048213

$ node bin/cli.js name --style username
SwiftFalcon048213

$ node bin/cli.js password --length 20
xT8!kLp2@qZ9vR4#mN7$

$ node bin/cli.js both --style username --length 12
Name: BraveOtter719042
Password: aQ3!xP9mZ@kL
```

## Testing

```sh
npm test
```
