const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
const tmp = require('tmp');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
// setup
// let iterations = 1000;
// let setBuildTotalTime = 0;
// while (iterations >= 0) {
//     iterations -= 1;

    //  build set
    console.log("# FuzzyPhraseSetBuilder build: ");
    let startTime = new Date;
    let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")

    // check if test data is available
    if (!(fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))) {
        console.error('     Please run `yarn bench`');
    } else {
        console.log('     Test data available, beginning readstream');
    }
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
    console.log('     FuzzyPhraseSetBuilder setup time: ' + (+new Date - startTime) + 'ms');


    console.log("# FuzzyPhraseSet lookup");
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

    console.log('     set.contains() retrieval time: ' + (+new Date - startTime) + 'ms');

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

    console.log('     set.contains_prefix() retrieval time: ' + (+new Date - startTime) + 'ms');

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

    console.log('     set.fuzzy_match() retrieval time: ' + (+new Date - startTime) + 'ms');

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

    console.log('     set.fuzzy_match_prefix() retrieval time: ' + (+new Date - startTime) + 'ms');
// }
