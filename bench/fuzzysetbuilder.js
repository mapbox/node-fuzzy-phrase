const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const tmp = require('tmp');

let setBuildTotalTime = 0;
let containsTotalTime = 0;
let containsPrefixTotalTime = 0;
let fuzzyMatchTotalTime = 0;
let fuzzyMatchPrefixTotalTime = 0;

if (!(fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))) {
    console.error('     Please run `yarn bench`');
}

console.log("setting up... ");
let docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
let rl = readline.createInterface({
    input: docs
});

let sampleSize = 100000;
let phraseSetArray = [];
let startTime = new Date;
let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")

rl.on('line', (line) => {
    let words = line.split(' ');
    setBuilder.insert(words);
    if (phraseSetArray.length < sampleSize && Math.random() < .01) {
        phraseSetArray.push(words);
    }
}).on('close', () => {
    setBuilder.finish();
    setBuildTotalTime += (new Date - startTime);

    console.log("setup complete");
    console.log("benching...");

    let sampleSize = phraseSetArray.length;

    let set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    startTime = new Date;
    for (let i = 0; i < phraseSetArray.length; i++) {
        set.contains(phraseSetArray[i]);
    }
    containsTotalTime = (new Date - startTime);

    startTime = new Date;
    for (let i = 0; i < phraseSetArray.length; i++) {
        set.contains_prefix(phraseSetArray[i]);
    }
    containsPrefixTotalTime = (new Date - startTime);

    startTime = new Date;
    for (let i = 0; i < phraseSetArray.length; i++) {
        set.fuzzy_match(phraseSetArray[i], 1, 1);
    }
    fuzzyMatchTotalTime = (new Date - startTime);

    startTime = new Date;
    for (let i = 0; i < phraseSetArray.length; i++) {
        set.fuzzy_match_prefix(phraseSetArray[i], 1, 1);
    }
    fuzzyMatchPrefixTotalTime = (new Date - startTime);

    console.log(" ");

    console.log("Benchmark results: ");
    console.log("# FuzzyPhraseSetBuilder build: ");
    console.log('     avg FuzzyPhraseSetBuilder setup time: ' + (setBuildTotalTime/sampleSize) + 'ms');

    console.log("# FuzzyPhraseSet lookup");
    console.log('     avg contains() lookup time: ' + (containsTotalTime/sampleSize) + 'ms');
    console.log('     avg contains_prefix() lookup time: ' + (containsPrefixTotalTime/sampleSize) + 'ms');
    console.log('     avg fuzzy_match() lookup time: ' + (fuzzyMatchTotalTime/sampleSize) + 'ms');
    console.log('     avg fuzzy_match_prefix() lookup time: ' + (fuzzyMatchPrefixTotalTime/sampleSize) + 'ms');
    process.exit(0);
})
