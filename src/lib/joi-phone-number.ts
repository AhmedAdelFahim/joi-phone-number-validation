import Joi from 'joi';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js/mobile';

export enum RETURNING_FORMAT {
  ORIGINAL = 'ORIGINAL',
  FORMATTED_VALUE = 'FORMATTED_VALUE',
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
  'E.164' = 'E.164',
  RFC3966 = 'RFC3966',
  VALUE__WITH_EXTRA_INFO = 'VALUE__WITH_EXTRA_INFO',
}

const JoiPhoneNumber = (joi: Joi.Root): Joi.Extension => {
  return {
    base: Joi.string(),
    type: 'string',
    messages: {
      'phoneNumber.invalid': '"{{#label}}" is invalid phone number',
    },
    rules: {
      phoneNumber: {
        method(options = {}) {
          return this.$_addRule({ name: 'phoneNumber', args: { options } });
        },
        args: [
          {
            name: 'options',
            assert: Joi.object({
              returningFormat: Joi.string()
                .trim()
                .valid(...Object.values(RETURNING_FORMAT)),
            }),
            message: 'options must be object',
          },
        ],
        validate(value, helpers, args, options) {
          try {
            const returningFormat: RETURNING_FORMAT = args?.options?.returningFormat || RETURNING_FORMAT.ORIGINAL;
            const parsedNumber = parsePhoneNumberFromString(value);
            if (parsedNumber?.country && isValidPhoneNumber(value, parsedNumber?.country)) {
              switch (returningFormat) {
                case RETURNING_FORMAT.FORMATTED_VALUE:
                  return parsedNumber.number;
                case RETURNING_FORMAT.VALUE__WITH_EXTRA_INFO:
                  return {
                    originalValue: value,
                    nationalNumber: parsedNumber.nationalNumber,
                    formattedNumber: parsedNumber.number,
                    countryCode: parsedNumber.country,
                    countryCallingCode: parsedNumber.countryCallingCode,
                  };
                case RETURNING_FORMAT.NATIONAL:
                case RETURNING_FORMAT.INTERNATIONAL:
                case RETURNING_FORMAT['E.164']:
                case RETURNING_FORMAT.RFC3966:
                  return parsedNumber.format(returningFormat);
                default:
                  return value;
              }
            } else {
              throw new Error('phoneNumber.invalid');
            }
          } catch (e) {
            return helpers.error('phoneNumber.invalid');
          }
        },
      },
    },
  };
};

export default Joi.extend(JoiPhoneNumber);
