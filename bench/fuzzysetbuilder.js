const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
let suite = new require('benchmark').Suite();

module.exports = setup;

function setup(cb) {
    if (!cb) cb = function(){};
    console.log('# FuzzyPhraseSetBuilder');
    var start = +new Date;
    // streetnames with "Lake" from TIGER
    var seq = 1;
    var docs = require('fs').readFileSync(__dirname + '/fixtures/test-words.txt', 'utf8')
        .split('\n');
    runBenchmark(cb);
}

function runBenchmark(cb) {
    suite.add('FuzzyPhraseSetBuilder', {
        'defer': true,
        'fn': FuzzyPhraseSetBuilder
    })
    .on('complete', function(event) {
        console.log(String(event.target), '\n');
        cb(null, suite);
    })
    .run({'async': true});
}


if (!process.env.runSuite) setup();
