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

  it('should not be valid when none of the required properties are provided', () => {
    const validate = anObject()
      .requiresOneOf('name', 'type');

    validate({name: 'John'}).valid.should.be.true;
    validate({type: 'human'}).valid.should.be.true;
    validate({}).valid.should.be.false;
  });

  it('should have an array as property', () => {
    const validate = anObject()
      .withProperty('values').which.isAnArray();

    const result = validate({name: 'meeting', values: [1,2,3]});

    result.valid.should.be.true;
  });

  it('should have a non empty array as property', () => {
    const validate = anObject()
      .withProperty('values').which.isANonEmptyArray();

    const result = validate({name: 'meeting', values: [1,2,3]});

    result.valid.should.be.true;
  });

  it('should not be valid when the array is empty, when wanting non empty array as property', () => {
    const validate = anObject()
      .withProperty('values').which.isANonEmptyArray();

    const result = validate({name: 'meeting', values: []});

    result.valid.should.be.false;
  });
});