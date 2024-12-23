import assert from 'assert';
import { JoiXssSanitizer, ACTION_LEVELS } from '..';
import Joi from 'joi';

describe('Joi XSS Sanitizer Tests', function () {
  const createSchema = (options = {}) => JoiXssSanitizer.string().sanitizer(options);

  describe('Validation Mode', function () {
    it('should allow safe content', function () {
      const input = '<p>Safe</p>';
      const schema = createSchema({ actionLevel: ACTION_LEVELS.VALIDATE });
      const result = schema.validate(input);
      assert.deepStrictEqual(result, { value: input });
    });

    it('should reject unsafe content with default options', function () {
      const input = '<script>Unsafe</script>';
      const schema = createSchema({ actionLevel: ACTION_LEVELS.VALIDATE });
      const result = schema.validate(input);
      assert.strictEqual(result.error?.details?.[0]?.message, '"value" has unsafe content');
    });

    it('should respect custom allowed tags', function () {
      const input = '<script>Allowed</script>';
      const schema = createSchema({
        actionLevel: ACTION_LEVELS.VALIDATE,
        sanitizerOptions: { allowedTags: ['script'] },
      });
      const result = schema.validate(input);
      assert.deepStrictEqual(result, { value: input });
    });

    it('should respect custom allowed attributes', function () {
      const input = '<p onclick="return;">Test</p>';
      const schema = createSchema({
        actionLevel: ACTION_LEVELS.VALIDATE,
        sanitizerOptions: { allowedAttributes: { p: ['onclick'] } },
      });
      const result = schema.validate(input);
      assert.deepStrictEqual(result, { value: input });
    });
  });

  describe('Sanitization Mode', function () {
    it('should remove unsafe content by default', function () {
      const input = '<script>Unsafe</script>';
      const schema = createSchema({ actionLevel: ACTION_LEVELS.SANITIZE });
      const result = schema.validate(input);
      assert.deepStrictEqual(result, { value: '' });
    });

    it('should retain allowed tags during sanitization', function () {
      const input = '<script>Allowed</script>';
      const schema = createSchema({
        actionLevel: ACTION_LEVELS.SANITIZE,
        sanitizerOptions: { allowedTags: ['script'] },
      });
      const result = schema.validate(input);
      assert.deepStrictEqual(result, { value: input });
    });

    it('should sanitize mixed content', function () {
      const input = '<p>Safe</p><script>Unsafe</script>';
      const schema = createSchema({ actionLevel: ACTION_LEVELS.SANITIZE });
      const result = schema.validate(input);
      assert.deepStrictEqual(result, { value: '<p>Safe</p>' });
    });
  });

  describe('Complex Object Validation', function () {
    const schema = Joi.object({
      a: createSchema({
        actionLevel: ACTION_LEVELS.VALIDATE,
        sanitizerOptions: { allowedTags: ['script'] },
      }),
      b: createSchema({
        actionLevel: ACTION_LEVELS.VALIDATE,
        sanitizerOptions: { allowedAttributes: { p: ['onclick'] } },
      }),
      c: createSchema({ actionLevel: ACTION_LEVELS.SANITIZE }),
    });

    it('should handle multiple field configurations', function () {
      const input = {
        a: '<script>Allowed</script>',
        b: '<p onclick="alert()">Test</p>',
        c: '<img src="/" />',
      };
      const result = schema.validate(input);
      assert.deepStrictEqual(result, {
        value: {
          a: '<script>Allowed</script>',
          b: '<p onclick="alert()">Test</p>',
          c: '',
        },
      });
    });
  });
});
