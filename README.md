# Joi Phone Number

Joi Phone Number is validation rule for [Joi](https://www.npmjs.com/package/joi).

## Installation

```bash
$ npm i joi-phone-number-validation
```

## Usage

```javascript
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
  returningFormat: RETURNING_FORMAT.VALUE__WITH_EXTRA_INFO,
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
