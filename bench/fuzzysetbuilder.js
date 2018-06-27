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

// check if test data is available
if (!(fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))) {
    console.error('     Please run `yarn bench`');
}

// need to put everything in an array before doing a lookup
console.log("setting up... ");
let docs = fs.createReadStream('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
let rl = readline.createInterface({
    input: docs,
    output: process.stdout,
});

// create some arrays
let phraseSetArray = [];
rl.on('line', (line) => {
    phraseArray = []
    line.split(" ").forEach((word) => {
        word = word.toString();
        // console.log(`line 36: ${word}`);
        phraseArray.push(word);
    })
    phraseSetArray.push(phraseArray);
    rl.close();
    console.log("setup complete");
}).on('close', () => {
    console.log("benching...");
    while (iterations >= 0) {
        iterations -= 1;

        // # FuzzyPhraseSetBuilder bench
        //  build set
        let startTime = new Date;
        let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")

        // iterate over phraseSetArray to check for each phrase.
        phraseSetArray.forEach((phrase) => {
            setBuilder.insert(phrase);
        })
        setBuilder.finish();
        setBuildTotalTime += (new Date - startTime);

        // FuzzyPhraseSet lookup bench
        let set = new fuzzy.FuzzyPhraseSet("bench.fuzzy");
        for (let i = 0; i < phraseSetArray.length; i++) {

            // FuzzyPhraseSet.contains() bench
            startTime = new Date;
            set.contains(phraseSetArray[i]);
            containsTotalTime += (new Date - startTime);

            // FuzzyPhraseSet.contains_prefix() bench
            startTime = new Date;
            set.contains_prefix(phraseSetArray[i]);
            containsPrefixTotalTime += (new Date - startTime);

            // FuzzyPhraseSet.fuzzy_match() bench
            startTime = new Date;
            set.fuzzy_match(phraseSetArray[i], 1, 1);
            fuzzyMatchTotalTime += (new Date - startTime);

            // FuzzyPhraseSet.fuzzy_match_prefix() bench
            startTime = new Date;
            set.fuzzy_match_prefix(phraseSetArray[i], 1, 1);
            fuzzyMatchPrefixTotalTime += (new Date - startTime);
        }
    }
    rl.output.write("This is the end");
    rl.close()
    console.log("benching complete");
    console.log(" ");

    console.log("Benchmark results: ");
    console.log("# FuzzyPhraseSetBuilder build: ");
    console.log('     avg FuzzyPhraseSetBuilder setup time: ' + (setBuildTotalTime/1000) + 'ms');

    console.log("# FuzzyPhraseSet lookup");
    console.log('     avg contains() setup time: ' + (containsTotalTime/1000) + 'ms');
    console.log('     avg contains_prefix() lookup time: ' + (containsPrefixTotalTime/1000) + 'ms');
    console.log('     avg fuzzy_match() lookup time: ' + (fuzzyMatchTotalTime/1000) + 'ms');
    console.log('     avg fuzzy_match_prefix() lookup time: ' + (fuzzyMatchPrefixTotalTime/1000) + 'ms');
})
