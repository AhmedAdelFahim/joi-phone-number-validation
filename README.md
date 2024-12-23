# Joi XSS Sanitizer

**🛡️ A powerful Joi extension for HTML sanitization and XSS prevention. Seamlessly validate and sanitize HTML content in your Node.js applications**

[![Latest Stable Version](https://img.shields.io/npm/v/joi-xss-sanitizer.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-xss-sanitizer)
[![License](https://img.shields.io/npm/l/joi-xss-sanitizer.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-xss-sanitizer)
[![NPM Downloads](https://img.shields.io/npm/dt/joi-xss-sanitizer.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-xss-sanitizer)
[![NPM Downloads](https://img.shields.io/npm/dm/joi-xss-sanitizer.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-xss-sanitizer)

## 🚀 Features

- 🛡️ **XSS Protection**: Sanitizes user inputs to prevent cross-site scripting (XSS) attacks.
- ✅ **Flexible Validation**: Supports validation and sanitization at different action levels (`VALIDATE` or `SANITIZE`).
- 🔧 **Customizable**: Configure allowed tags, attributes, and other options via [sanitize-html](https://www.npmjs.com/package/sanitize-html).
- 🧩 **Seamless Integration**: Easily integrates with Joi schema validations.

---

## 📦 Installation

Install the package using npm or yarn:

```bash
npm install joi-xss-sanitizer
# or
yarn add joi-xss-sanitizer
```

## 📖 Usage

### Basic Example

```javascript
import { JoiXssSanitizer, ACTION_LEVELS } from 'joi-xss-sanitizer';

// or

const {JoiXssSanitizer, ACTION_LEVELS} = require('joi-xss-sanitizer');

const input = '<p onclick="return;">Test</p>';

const schema = JoiXssSanitizer.string().sanitizer({
  actionLevel: ACTION_LEVELS.VALIDATE,
  sanitizerOptions: {
    allowedAttributes: { h1: ['onclick'] },
    allowedTags: ['b', 'i'], // Allow specific HTML tags
  },
});
const result = schema.validate(input); // result.error contains error
```

### Advanced Example: Nested Objects

```javascript
import { JoiXssSanitizer, ACTION_LEVELS } from 'joi-xss-sanitizer';

// or

const {JoiXssSanitizer, ACTION_LEVELS} = require('joi-xss-sanitizer');

const schema = Joi.object({
  username: JoiXssSanitizer.string().sanitizer({
    actionLevel: ACTION_LEVELS.SANITIZE,
  }),
  profile: Joi.object({
    bio: JoiXssSanitizer.string().sanitizer({
      actionLevel: ACTION_LEVELS.SANITIZE,
      sanitizerOptions: {
        allowedTags: ['b', 'i', 'u'],
      },
    }),
  }),
});

const input = {
  username: '<script>malicious()</script>',
  profile: {
    bio: '<b>Welcome!</b> <img src="x" />',
  },
};

const result = schema.validate(input);
console.log(result.value);
```
## 🔧 API Reference
`sanitizer(options)`

* *Description:* Adds XSS sanitization and validation to your Joi schema.
* *Parameters:*
  * `options` (Object):
    * `actionLevel` (String):
      * `SANITIZE` - Returns sanitized content.
      * `VALIDATE` - Throws an error for unsafe content.
    * `sanitizerOptions` (Object): Configuration options for [sanitize-html](https://www.npmjs.com/package/sanitize-html).
## 💡 Best Practices
1. Always validate and sanitize user inputs on the server side.
2. Use custom sanitizerOptions to allow only the required HTML tags and attributes.
3. Pair this library with a Content Security Policy (CSP) for enhanced XSS protection.

## Tests

To run the test suite, first install the dependencies then run `npm test`:

```bash
$ npm install
$ npm test
```

## 📬 Feedback and Support

Have questions or feedback? Open an issue on [GitHub](https://github.com/AhmedAdelFahim/joi-xss-sanitizer) or reach out via email.