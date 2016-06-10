/*eslint no-unused-vars:0 */
'use strict';

const chai = require('chai');
const should = chai.should();

const anObject = require('../').anObject;
const aNumber = require('../').aNumber;
const aString = require('../').aString;
const matchRegexp = require('../').matchRegexp;

describe('types validation behavior', () => {
  describe('simple object', () => {
    it('should be an object', () => {
      const validate = anObject();

      const result = validate({});

      result.valid.should.be.true;
      result.errors.should.be.empty;
    });
  
    it('should not be an object when a number', () => {
      const validate = anObject();
  
      validate(1).valid.should.be.false;
    });
  });

  describe('number', () => {
    it('should be a number', () => {
      const validate = aNumber();

      const result = validate(1);

      result.valid.should.be.true;
      result.errors.should.be.empty;
    });

    it('should be a number when instance of Number', () => {
      const validate = aNumber();

      const result = validate(Number('1'));

      result.valid.should.be.true;
      result.errors.should.be.empty;
    });

    it('should not be a number when string', () => {
      const validate = aNumber();

      const result = validate('1');

      result.valid.should.be.false;
      result.errors.should.have.length(1);
    });
  });

  describe('string', () => {
    it('should be a string', () => {
      const validate = aString();

      const result = validate('hey');

      result.valid.should.be.true;
      result.errors.should.be.empty;
    });

    it('should be a string when instance of String', () => {
      const validate = aString();

      const result = validate(String(123));

      result.valid.should.be.true;
      result.errors.should.be.empty;
    });

    it('should not be a string when object', () => {
      const validate = aString();

      const result = validate({});

      result.valid.should.be.false;
      result.errors.should.have.length(1);
    });
  });

  describe('match regexp', () => {
    it('should match Regexp', () => {
      const validate = matchRegexp(/t.*o/g);

      const result = validate('toto');

      result.valid.should.be.true;
      result.errors.should.be.empty;
    });

    it('should not match Regexp', () => {
      const validate = matchRegexp(/t.*o/g);

      const result = validate('tutu');

      result.valid.should.be.false;
      result.errors.should.have.length(1);
    });
  });
});