# node-shorten

node-shorten is a simple url shortener for Node.js.

## Installation

```bash
npm install node-shorten --save-dev
```

## Usage

By default it will shorten URL with base 32 encoding, but you can choose base 64 for more complex encoding.

```js
import shorten from 'node-shorten';

shorten("https://qqboxy.com/");
// ["FNYQJG", "UBF8QU", "E7R5VT", "2HAV5A"]

shorten("https://qqboxy.com/", { base: 64 });
// ["bZJAq2", "s9q4q2", "Yfx5c_", "!2SZR2", "z76Ai_", "ZYK8.3", "5jEwC_"]

```

## License

Released under the MIT license. Copyright (c) 2020 Boxy Huang.