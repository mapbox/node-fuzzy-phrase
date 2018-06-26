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
        console.error('     please run `yarn bench`');
    } else {
        console.log('     Test data available, beginning readstream');
    }
    let docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
    let rl = readline.createInterface({
        input: docs
    });

    fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');

    rl.on('line', (line) => {
        console.log(line);
        setBuilder.insert(line);
    })

    rl.close()

    setBuilder.finish();
    console.log('     FuzzyPhraseSetBuilder setup time: ' + (+new Date - startTime) + 'ms');

    console.log("# FuzzyPhraseSet lookup");
    // startTime = new Date;
    // let set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
    // console.log(' set retrieval time ' + (+new Date - startTime) + 'ms');
    //
    // startTime = new Date;
    // set.contains(docs);
    // console.log(' set contains time ' + (+new Date - startTime) + 'ms');
    //
    // startTime = new Date;
    // set.contains_prefix(docs);
    // console.log(' set contains_prefix time ' + (+new Date - startTime) + 'ms');
    //
    // startTime = new Date;
    // set.fuzzy_match(docs, 1, 1);
    // console.log(' set fuzzy_match time ' + (+new Date - startTime) + 'ms');
    //
    // startTime = new Date;
    // set.fuzzy_match_prefix(docs, 1, 1);
    // console.log(' set fuzzy_match_prefix time ' + (+new Date - startTime) + 'ms');
// }
