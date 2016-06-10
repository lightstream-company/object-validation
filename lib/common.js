'use strict';

function name(func) {
  return func && func.name || 'unknown';
}

function validateSingleRule(validateRule, message) {
  message = message || ('the following rule validation has failed: ' + name(validateRule));
  return (value) => {
    const valid = validateRule(value);
    return {
      valid,
      errors: valid ? [] : [message]
    };
  };
}

module.exports = {
  validateSingleRule
};