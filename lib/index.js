'use strict';

const fuzzyPhrase = require('../lib/module/index.node');

module.exports = fuzzyPhrase;
module.exports.ENDING_TYPE = {
    nonPrefix: 0,
    anyPrefix: 1,
    wordBoundaryPrefix: 2,
}
