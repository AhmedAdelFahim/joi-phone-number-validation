# Joi Phone Number

Joi Phone Number is validation rule for [Joi](https://www.npmjs.com/package/joi).

[![Latest Stable Version](https://img.shields.io/npm/v/joi-phone-number-validation.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-phone-number-validation)
[![License](https://img.shields.io/npm/l/joi-phone-number-validation.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-phone-number-validation)
[![NPM Downloads](https://img.shields.io/npm/dt/joi-phone-number-validation.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-phone-number-validation)
[![NPM Downloads](https://img.shields.io/npm/dm/joi-phone-number-validation.svg?style=for-the-badge)](https://www.npmjs.com/package/joi-phone-number-validation)

## Installation

```bash
$ npm i joi-phone-number-validation
```

## Usage

```javascript
const { JoiPhoneNumber, RETURNING_FORMAT } = require("joi-phone-number-validation");

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT.NATIONAL,
});
const { value, error } = schema.validate('+2010 605 944 88');   // 010 60594488

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT.INTERNATIONAL,
});
const { value, error } = schema.validate('+2010 605 944 88');   // +20 10 60594488

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT.ORIGINAL,
});
const { value, error } = schema.validate('+2010 605 944 88');   // +2010 605 944 88

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT.FORMATTED_VALUE,
});
const { value, error } = schema.validate('+2010 605 944 88');   // +201060594488

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT.RFC3966,
});
const { value, error } = schema.validate('+2010 605 944 88');   // tel:+201060594488

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT['E.164'],
});
const { value, error } = schema.validate('+2010 605 944 88');   // +201060594488

const schema = JoiPhoneNumber.string().phoneNumber({
  returningFormat: RETURNING_FORMAT.VALUE_WITH_EXTRA_INFO,
});
const { value, error } = schema.validate('+2010 605 944 88');   
/*
output: {
        countryCode: 'EG',
        formattedNumber: '+201060594488',
        nationalNumber: '1060594488',
        originalValue: '+2010 605 944 88',
        countryCallingCode: '20',
      }
*/
```


## Tests

To run the test suite, first install the dependencies then run `npm test`:

```bash
$ npm install
$ npm test
```

## Support

Feel free to open issues on [github](https://github.com/AhmedAdelFahim/joi-phone-number-validation).
