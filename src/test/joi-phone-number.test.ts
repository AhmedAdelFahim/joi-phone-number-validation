import assert from 'assert';
import { JoiPhoneNumber, RETURNING_FORMAT } from '..';

describe('Joi Phone Number Testing', function () {
  describe('valid numbers testing', function () {
    it('Should get NATIONAL formatted number.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT.NATIONAL,
      });
      const { value, error } = schema.validate('+2010 605 944 77');
      assert.equal(error, undefined);
      assert.equal(value, '010 60594477');
    });

    it('Should get INTERNATIONAL formatted number.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT.INTERNATIONAL,
      });
      const { value, error } = schema.validate('+2010 605 944 88');
      assert.equal(error, undefined);
      assert.equal(value, '+20 10 60594488');
    });

    it('Should get ORIGINAL number.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT.ORIGINAL,
      });
      const { value, error } = schema.validate('+966 55 7777777');
      assert.equal(error, undefined);
      assert.equal(value, '+966 55 7777777');
    });

    it('Should get formatted number without space.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT.FORMATTED_VALUE,
      });
      const { value, error } = schema.validate('+2010 605 944 88');
      assert.equal(error, undefined);
      assert.equal(value, '+201060594488');
    });

    it('Should get E.164 formatted number.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT['E.164'],
      });
      const { value, error } = schema.validate('+2010 605 944 88');
      assert.equal(error, undefined);
      assert.equal(value, '+201060594488');
    });

    it('Should get RFC3966 formatted number.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT.RFC3966,
      });
      const { value, error } = schema.validate('+2010 605 944 88');
      assert.equal(error, undefined);
      assert.equal(value, 'tel:+201060594488');
    });

    it('Should get VALUE__WITH_EXTRA_INFO.', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber({
        returningFormat: RETURNING_FORMAT.VALUE_WITH_EXTRA_INFO,
      });
      const { value, error } = schema.validate('+2010 605 944 88');
      assert.equal(error, undefined);
      assert.deepEqual(value, {
        countryCode: 'EG',
        formattedNumber: '+201060594488',
        nationalNumber: '1060594488',
        originalValue: '+2010 605 944 88',
        countryCallingCode: '20',
      });
    });
  });

  describe('invalid numbers testing', function () {
    it('Should get error (invalid carrier code).', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber().label('phone');
      const { value, error } = schema.validate('+2018 605 944 88');
      assert.equal(error.message, '""phone"" is invalid phone number');
      assert.equal(value, '+2018 605 944 88');
    });

    it('Should get error (invalid length).', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber().label('phone');
      const { value, error } = schema.validate('+2010 605 944 7');
      assert.equal(error.message, '""phone"" is invalid phone number');
      assert.equal(value, '+2010 605 944 7');
    });

    it('Should get error (invalid country code).', async function () {
      const schema = JoiPhoneNumber.string().phoneNumber().label('phone');
      const { value, error } = schema.validate('+3010 605 944 7');
      assert.equal(error.message, '""phone"" is invalid phone number');
      assert.equal(value, '+3010 605 944 7');
    });
  });
});
