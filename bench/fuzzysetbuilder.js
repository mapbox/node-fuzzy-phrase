const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');

// setup
// let iterations = 1000;
// while (iterations >= 0) {
//     iterations -= 1;
    console.log("# FuzzyPhraseSetBuilder build: ");
    let startTime = new Date;
    let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")
    let docs = require('fs').readFileSync(__dirname + '/fixtures/us-address-words.txt', 'utf8')
            .split('\n');
    setBuilder.insert(docs);
    setBuilder.finish();
    console.log('setup time ' + (+new Date - startTime) + 'ms');

    console.log("# FuzzyPhraseSet lookup");
    startTime = new Date;
    let set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    console.log(' set retrieval time ' + (+new Date - startTime) + 'ms');

    startTime = new Date;
    set.contains(docs);
    console.log(' set contains time ' + (+new Date - startTime) + 'ms');

    startTime = new Date;
    set.contains_prefix(docs);
    console.log(' set contains_prefix time ' + (+new Date - startTime) + 'ms');

    startTime = new Date;
    set.fuzzy_match(docs, 1, 1);
    console.log(' set fuzzy_match time ' + (+new Date - startTime) + 'ms');

    startTime = new Date;
    set.fuzzy_match_prefix(docs, 1, 1);
    console.log(' set fuzzy_match_prefix time ' + (+new Date - startTime) + 'ms');
// }
