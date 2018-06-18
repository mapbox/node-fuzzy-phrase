const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
let suite = new require('benchmark').Suite();

// setup
console.log("# FuzzyPhraseSetBuilder build: ");
let startTime = new Date;
let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")
let docs = require('fs').readFileSync(__dirname + '/fixtures/test-words.txt', 'utf8')
        .split('\n');
setBuilder.insert(docs);
setBuilder.finish();
console.log('setup time ' + (+new Date - startTime) + 'ms');


// time here
console.log("# FuzzyPhraseSet lookup");
startTime = new Date;
let set = new fuzzy.FuzzyPhraseSet("set.fuzzy");
// time here
set.contains(docs);
console.log('lookup time ' + (+new Date - startTime) + 'ms');
