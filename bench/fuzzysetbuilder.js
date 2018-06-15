const fuzzy = require('../lib');
const assert = require('assert');
const tape = require('tape');
var suite = new require('benchmark').Suite();

tape('build FuzzyPhraseSetBuilder', (t) => {
    let build = new fuzzy.FuzzyPhraseSetBuilder("set.fuzzy");
    t.ok(build, "FuzzyPhraseSetBuilder built");
    t.throws(() => { new fuzzy.FuzzyPhraseSetBuilder()});
    t.throws(() => { new fuzzy.FuzzyPhraseSetBuilder("/etc/passwd")});
    t.throws(() => { new fuzzy.FuzzyPhraseSetBuilder({})});
    t.throws(() => { new fuzzy.FuzzyPhraseSetBuilder(7)});
    t.end();
})

tape("FuzzyPhraseSetBuilder insertion and Set lookup", (t) => {
    let build = new fuzzy.FuzzyPhraseSetBuilder("set.fuzzy");

    build.insert(["bruce"]);
    build.insert(["clarence"]);
    build.insert(["stevie"]);

    build.finish();

    let set = new fuzzy.FuzzyPhraseSet("set.fuzzy");
    set.contains(["bruce", "clarence", "stevie"]);

    t.throws(() => { new fuzzy.FuzzyPhraseSet() });
    t.throws(() => { new fuzzy.FuzzyPhraseSet("/etc/passwd") });
    t.throws(() => { new fuzzy.FuzzyPhraseSet({}) });
    t.throws(() => { new fuzzy.FuzzyPhraseSet(7) });
    t.end();
})

module.exports = setup;

function setup(cb) {
    if (!cb) cb = function(){};
    console.log('# geocode');
    var start = +new Date;
    // streetnames with "Lake" from TIGER
    var seq = 1;
    var docs = require('fs').readFileSync(__dirname + '/fixtures/lake-streetnames.txt', 'utf8')
        .split('\n')
        .filter(function(text) { return !!text; })
        .slice(0,500)
        .reduce(function(memo, text) {
            // generate between 1-100 features with this text.
            var seed = 100;
            for (var i = 0; i < seed; i++) {
                var lat = Math.random() * 170 - 85;
                var lon = Math.random() * 360 - 180;
                memo.push({
                    id: ++seq,
                    type: 'Feature',
                    properties: {
                        'carmen:text': text,
                        'carmen:center': [lon, lat]
                    },
                    geometry: { type:'Point', coordinates:[lon,lat] }
                });
            }
            return memo;
        }, []);
    index.update(conf.street, docs, { zoom:14 }, function(err) {
        if (err) throw err;
        index.store(conf.street, function(err) {
            if (err) throw err;
            console.log('setup time ' + (+new Date - start) + 'ms');
            // compact the dawg cache to simulate production
            console.time("compacting dawg");
            Object.keys(c.indexes).forEach(function(idx_name) {
                var compacted = new dawgcache(c.indexes[idx_name]._dictcache.dump())
                c.indexes[idx_name]._dictcache = compacted;
            })
            console.timeEnd("compacting dawg");
            runBenchmark(cb);
        });
    });
}

function runBenchmark(cb) {
    suite.add('geocode', {
        'defer': true,
        'fn': geocode
    })
    .on('complete', function(event) {
        console.log(String(event.target), '\n');
        cb(null, suite);
    })
    .run({'async': true});
}

function geocode(deferred) {
    c.geocode('Westside Lake Rd', {}, function (err, res) {
        if (err || (res && !res.features.length)) throw err;
        deferred.resolve();
    });
}

if (!process.env.runSuite) setup();
