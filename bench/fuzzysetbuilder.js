const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
let suite = new require('benchmark').Suite();

// setup
console.log("# FuzzyPhraseSetBuilder build: ");
var startTime = new Date;
let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")
let docs = require('fs').readFileSync(__dirname + '/fixtures/test-words.txt', 'utf8')
        .split('\n');
setBuilder.insert(docs);
setBuilder.finish();
let totalTime = new Date - startTime;
console.log('setup time ' + (+new Date - startTime) + 'ms');


// time here
let set = new fuzzy.FuzzyPhraseSet("set.fuzzy");

docs.forEach((el) => {
    set.contains([el]);
})
// time here
set.contains(docs);
