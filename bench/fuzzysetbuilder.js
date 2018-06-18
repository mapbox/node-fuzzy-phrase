const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
let suite = new require('benchmark').Suite();

module.exports = setup;

// setup
// start
// end

// var totalTime;
// var start = new Date;
// var iterations = 6;
// while (iterations--) {
// 	// Code snippet goes here.
// }
// // `totalTime` is the number of milliseconds it took to execute the code snippet 6 times.
// totalTime = new Date - start;
//
// OR
// var hz;
// var period;
// var startTime = new Date;
// var runs = 0;
// do {
// 	// Code snippet goes here.
// 	runs++;
// 	totalTime = new Date - startTime;
// } while (totalTime < 1000);
//
// // Convert milliseconds to seconds.
// totalTime /= 1000;
//
// // period → how long each operation takes
// period = totalTime / runs;
//
// // hz → the number of operations per second.
// hz = 1 / period;
//
// // This can be shortened to:
// // hz = (runs * 1000) / totalTime;

function setup(cb) {
    if (!cb) cb = function(){};
    console.log('# FuzzyPhraseSetBuilder');
    var start = +new Date;
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
