import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';
export enum ACTION_LEVELS {
  SANITIZE = 'SANITIZE', // return sanitized string
  VALIDATE = 'VALIDATE', // throw error if string contains unsafe content
}

interface IJoiXssSanitizerOptions {
  actionLevel?: ACTION_LEVELS;
  sanitizerOptions?: sanitizeHtml.IOptions;
}

const JoiXssSanitizer = (joi: Joi.Root): Joi.Extension => {
  return {
    base: Joi.string(),
    type: 'string',
    messages: {
      'sanitizer.unsafe': '{{#label}} has unsafe content',
    },
    rules: {
      sanitizer: {
        method(options: IJoiXssSanitizerOptions = {}) {
          return this.$_addRule({ name: 'sanitizer', args: { options } });
        },
        args: [
          {
            name: 'options',
            assert: Joi.object({
              actionLevel: Joi.string()
                .trim()
                .valid(...Object.values(ACTION_LEVELS))
                .optional(),
              sanitizerOptions: Joi.any().optional(),
            }),
            message: 'options must be object',
          },
        ],
        validate(value: string, helpers, args, options) {
          try {
            const argOptions: IJoiXssSanitizerOptions = args?.options;
            const actionLevel: ACTION_LEVELS = argOptions?.actionLevel || ACTION_LEVELS.VALIDATE;
            const sanitizedContent = sanitizeHtml(value, argOptions?.sanitizerOptions);
            if (actionLevel === ACTION_LEVELS.SANITIZE) {
              return sanitizedContent;
            } else if (actionLevel === ACTION_LEVELS.VALIDATE) {
              if (value !== sanitizedContent) {
                throw new Error('sanitizer.unsafe');
              } else {
                return sanitizedContent;
              }
            }
          } catch (e) {
            return helpers.error('sanitizer.unsafe');
          }
        },
      },
    },
  };
};

export default Joi.extend(JoiXssSanitizer);
