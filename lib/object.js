'use strict';

const types = require('./types');
const common = require('./common');

function buildObjectValidator() {
  var validators = [common.validateSingleRule(
    value => !!value && value instanceof Object,
    'the value must be an object'
  )];

  const validate = value =>
    validators.reduce((mergedResult, validator) => {
      const result = validator(value);
      return {
        valid: mergedResult.valid && result.valid,
        errors: mergedResult.errors.concat(result.errors)
      };
    }, {valid: true, errors: []});

  function notRequired(validateRule) {
    return value => !value || validateRule(value);
  }

  function onPropertyValue(property, validateRule) {
    return value => validateRule(value[property]);
  }

  function chainValidator(validator) {
    validators = validators.concat(validator);
  }

  function buildPropertyValidator(property) {
    function validateProperty(validateRule, message) {
      chainValidator(
        onPropertyValue(property,
          common.validateSingleRule(validateRule, message)));
      return validate;
    }

    validate.which = validate;
    validate.and = validate;
    validate.isAString = (message) => {
      return validateProperty(
        notRequired(types.isAString),
        message || `the property ${property} must be a string`);
    };
    validate.isANumber = (message) => {
      return validateProperty(
        notRequired(types.isANumber),
        message || `the property ${property} must be a number`);
    };
    validate.required = (message) => {
      return validateProperty(
        types.isRequired,
        message || `the property ${property} is required`);
    };
    validate.isAnEmail = (message) => {
      return validateProperty(
        notRequired(types.isAnEmail),
        message || `the property ${property} must be a valid email`);
    };
    validate.isADate = (message) => {
      return validateProperty(
        notRequired(types.isADate),
        message || `the property ${property} must be a valid date`);
    };
    validate.among = (list, message) => {
      return validateProperty(
        notRequired(types.among(list)),
        message || `the property ${property} must be among ${list}`);
    };
    validate.isAnArray = (message) => {
      return validateProperty(
        notRequired(types.isAnArray),
        message || `the property ${property} must be a valid array`);
    };
    validate.isANonEmptyArray = (message) => {
      return validateProperty(
        notRequired(value => types.isAnArray(value) && value.length > 0),
        message || `the property ${property} must be a valid array`);
    };

      return validate;
  }

  validate.withProperty = buildPropertyValidator;
  
  validate.requiresOneOf = function() {
    const properties = Array.prototype.slice.call(arguments);
    const validateRule = value => {
      return properties.reduce((exists, property) => {
        return exists || !!value[property];
      }, false);
    };
    chainValidator(common.validateSingleRule(validateRule, `one of the following values is required ${properties}`));

    return validate;
  };

  return validate;
}

module.exports = buildObjectValidator;