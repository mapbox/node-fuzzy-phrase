const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
let suite = new require('benchmark').Suite();


// module.exports = setup;

// setup
let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")
let docs = require('fs').readFileSync(__dirname + '/fixtures/test-words.txt', 'utf8')
        .split('\n');
setBuilder.insert(docs);
setBuilder.finish();

let set = new fuzzy.FuzzyPhraseSet("set.fuzzy");

docs.forEach((el) => {
    console.log(el);
    // set.contains(el)
})
console.log(typeof(set))
// function setup(cb) {
//     if (!cb) cb = function(){};
//     console.log('# FuzzyPhraseSetBuilder');
//     let start = +new Date;
//     let iterations = 10;
//     let docs = require('fs').readFileSync(__dirname + '/fixtures/test-words.txt', 'utf8')
//         .split('\n');
//     runBenchmark(cb);
// }
// // start
// function runBenchmark(cb) {
//     suite.add('FuzzyPhraseSetBuilder', {
//         'defer': true,
//         'fn': fuzzy.FuzzyPhraseSetBuilder.new()
//     })
//     .on('complete', function(event) {
//         console.log(String(event.target), '\n');
//         cb(null, suite);
//     })
//     .run({'async': true});
// }
// end

// let totalTime;
// let start = new Date;
// let iterations = 6;
// while (iterations--) {
// 	// Code snippet goes here.
// }
// // `totalTime` is the number of milliseconds it took to execute the code snippet 6 times.
// totalTime = new Date - start;
//
// OR
// let hz;
// let period;
// let startTime = new Date;
// let runs = 0;
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

// This can be shortened to:
// hz = (runs * 1000) / totalTime;

// if (!process.env.runSuite) setup();
