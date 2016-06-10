/*eslint no-unused-vars:0 */
'use strict';

const chai = require('chai');
const should = chai.should();

const anObject = require('../lib/object');

describe('simple object behavior', () => {
  it('should have typed property', () => {
    const validate = anObject()
      .withProperty('name').which.isAString();

    const result = validate({name: 'John'});

    result.valid.should.be.true;
  });

  it('should have property with proper type', () => {
    const validate = anObject()
      .withProperty('name').which.isAString();

    const result = validate({name: 12});
    
    result.valid.should.be.false;
    result.errors.should.have.length(1);
    result.errors[0].should.contain('string');
  });

  it('should be valid even if property is undefined', () => {
    const validate = anObject()
      .withProperty('name').which.isAString();

    const result = validate({});
    
    result.valid.should.be.true;
  });

  it('should not be valid if property required and undefined', () => {
    const validate = anObject()
      .withProperty('name').which.isAString().required();

    const result = validate({});

    result.valid.should.be.false;
    result.errors.should.have.length(1);
    result.errors[0].should.contain('required');
  });

  it('should have multiple typed properties', () => {
    const validate = anObject()
      .withProperty('name').which.isAString()
      .and.withProperty('age').which.isANumber();

    const result = validate({name: 'John', age: 34});

    result.valid.should.be.true;
  });

  it('should have an email as property', () => {
    const validate = anObject()
      .withProperty('email').which.isAnEmail();

    const result = validate({name: 'John', email: 'john.doe+1@email.net'});

    result.valid.should.be.true;
  });

  it('should have a date as property', () => {
    const validate = anObject()
      .withProperty('at').which.isADate();

    const result = validate({name: 'meeting', at: new Date(2016,5,10)});

    result.valid.should.be.true;
  });

  it('should have property among a list of values', () => {
    const validate = anObject()
      .withProperty('type').which.isAString().among(['twitter', 'facebook', 'instagram']);

    const result = validate({type: 'twitter'});

    result.valid.should.be.true;
  });

  it('should not be valid when property is not among a list of values', () => {
    const validate = anObject()
      .withProperty('type').which.isAString().among(['twitter', 'facebook', 'instagram']);

    const result = validate({type: 'something else'});

    result.valid.should.be.false;
    result.errors.should.have.length(1);
  });

  it('should be valid when none of the required properties are provided', () => {
    const validate = anObject()
      .requiresOneOf('name', 'type');

    validate({name: 'John'}).valid.should.be.true;
    validate({type: 'human'}).valid.should.be.true;
    validate({}).valid.should.be.false;
  });
});