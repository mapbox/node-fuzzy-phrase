'use strict';

const fuzzyPhrase = require('../native/index.node');

module.exports = fuzzyPhrase;
module.exports.ENDING_TYPE = {
    nonPrefix: 0,
    anyPrefix: 1,
    wordBoundaryPrefix: 2,
}
