const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
const tmp = require('tmp');
const path = require('path');
const fs = require('fs');
const readline = require('readline');


let iterations = 1000;
let setBuildTotalTime = 0;
let containsTotalTime = 0;
let containsPrefixTotalTime = 0;
let fuzzyMatchTotalTime = 0;
let fuzzyMatchPrefixTotalTime = 0;

if (!(fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))) {
    console.error('     Please run `yarn bench`');
}

while (iterations >= 0) {
    iterations -= 1;

    //  build set
    let startTime = new Date;
    let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")

    // check if test data is available

    let docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
    let rl = readline.createInterface({
        input: docs
    });

    rl.on('line', (line) => {
        console.log(line);
        setBuilder.insert(line);
    })

    rl.close()
    setBuilder.finish();
    setBuildTotalTime += (new Date - startTime);


    // FuzzyPhraseSet.contains() bench
    startTime = new Date;
    let set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
    rl = readline.createInterface({
        input: docs
    });

    rl.on('line', (line) => {
        console.log(line);
        set.contains(line);
    })

    rl.close()
    containsTotalTime += (new Date - startTime);

    // FuzzyPhraseSet.contains_prefix() bench
    startTime = new Date;
    set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
    rl = readline.createInterface({
        input: docs
    });

    rl.on('line', (line) => {
        console.log(line);
        set.contains_prefix(line);
    })

    rl.close()

    containsPrefixTotalTime += (new Date - startTime);

    // FuzzyPhraseSet.fuzzy_match() bench
    startTime = new Date;
    set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
    rl = readline.createInterface({
        input: docs
    });

    rl.on('line', (line) => {
        console.log(line);
        set.fuzzy_match(line, 1, 1);
    })

    rl.close()

    fuzzyMatchTotalTime += (new Date - startTime);

    // FuzzyPhraseSet.fuzzy_match_prefix() bench
    startTime = new Date;
    set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
    rl = readline.createInterface({
        input: docs
    });

    rl.on('line', (line) => {
        console.log(line);
        set.fuzzy_match_prefix(line, 1, 1);
    })

    rl.close()

    fuzzyMatchPrefixTotalTime += (new Date - startTime);
}

console.log("# FuzzyPhraseSetBuilder build: ");
console.log('     avg FuzzyPhraseSetBuilder setup time: ' + (setBuildTotalTime/1000) + 'ms');

console.log("# FuzzyPhraseSet lookup");
console.log('     avg contains() setup time: ' + (containsTotalTime/1000) + 'ms');
console.log('     avg contains_prefix() lookup time: ' + (containsPrefixTotalTime/1000) + 'ms');
console.log('     avg fuzzy_match() lookup time: ' + (fuzzyMatchTotalTime/1000) + 'ms');
console.log('     avg fuzzy_match_prefix() lookup time: ' + (fuzzyMatchPrefixTotalTime/1000) + 'ms');
