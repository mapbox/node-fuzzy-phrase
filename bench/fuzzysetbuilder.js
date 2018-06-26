const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
const tmp = require('tmp');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
// setup
// let iterations = 1000;
// while (iterations >= 0) {
//     iterations -= 1;
    console.log("# FuzzyPhraseSetBuilder build: ");
    let startTime = new Date;
    let setBuilder = new fuzzy.FuzzyPhraseSetBuilder("bench.fuzzy")
    if (!(fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))) {
        console.error('please run `yarn bench`');
    } else {
        console.log('things are fine... for now');
    }

    let rl = readline.createInterface({
        input: fs.createReadStream(path.resolve('../tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))
    });

    fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');

    rl.prompt;
    rl.close()


    // if (!(fs.existsSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt'))) {
    //     console.error('YOUR TEST DATA DOES NOT EXIST');
    // }
    // console.log(rl.input);

    rl.on('line', (line) => {
        console.log(line);
        // setBuilder.insert(line);
    })
    // let docs = fs.readFileSync('/tmp/fuzzy-phrase-bench/phrase/us_en_latn.txt');
            // .split('\n');

    // let docs = tmp.fileSync({name: '/tmp/'});
    // console.log("File: ", docs.name);
    // console.log("File Descriptor: ", docs.fd);
    // let tempFileNamePrefix = tmp.tmpNameSync();

    // docs.forEach(el) => {
    //     console.log(el);
    // }
    // setBuilder.insert(docs);
    // setBuilder.finish();
    // console.log('setup time ' + (+new Date - startTime) + 'ms');

    // console.log("# FuzzyPhraseSet lookup");
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
