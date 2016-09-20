'use strict';

const types = require('./lib/types');
const common = require('./lib/common');
const objectValidator = require('./lib/object');

module.exports.anObject = objectValidator;

module.exports.aNumber = function aNumber() {
  return common.validateSingleRule(types.isANumber);
};

module.exports.aString = function aString() {
  return common.validateSingleRule(types.isAString);
};

module.exports.matchRegexp = function matchRegexp(regexp) {
  return common.validateSingleRule(types.match(regexp));
};

module.exports.anEmail = function anEmail() {
  return common.validateSingleRule(types.isAnEmail);
};

module.exports.aDate = function aDate() {
  return common.validateSingleRule(types.isADate);
};

module.exports.anArray = function anArray() {
  return common.validateSingleRule(types.isAnArray);
};