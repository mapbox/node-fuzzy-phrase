set -euo pipefail

failures=0
success=0

export TMP=/tmp/fuzzy-phrase-bench
export S3_DIR=s3://mapbox/playground/boblannon/fuzzy-phrase/bench

#################################################################################
# Download
#
# This downloads test data from s3 and extracts it.  Example:
#
#     ./scripts/bench.sh download phrase us en latn
#
# ...would download the benchmark data for `phrase/` benchmarks for United
# States (us), in English (en), in Latin script (latn).
function download() {
    type=$1
    country=$2
    language=$3
    script=$4
    fname="${country}_${language}_${script}.txt.gz"
    sample_fname="${country}_${language}_${script}_sample.txt.gz"

    mkdir -p "${TMP}/${type}"

    FROM="${S3_DIR}/${type}/${fname}"
    TO="${TMP}/${type}/${fname}"
    echo "Downloading ${FROM}"
    aws s3 cp $FROM $TO
    echo "Extracting ${TO}"
    gunzip $TO

    FROM="${S3_DIR}/${type}/${sample_fname}"
    TO="${TMP}/${type}/${sample_fname}"
    echo "Downloading ${FROM}"
    aws s3 cp $FROM $TO
    echo "Extracting ${TO}"
    gunzip $TO
    exit 0
}

function run() {
    type=$1
    country=$2
    language=$3
    script=$4
    # this will be used to create filenames ${fbasename}.txt and ${fbasename}_sample.txt
    fbasename="${country}_${language}_${script}"
    echo "running"
    env PHRASE_BENCH="${TMP}/${type}/${fbasename}" cargo bench "${type}"
    exit 0
}

# remove tmp dir
function clean() {
    if [[ -d $TMP ]]; then
        echo "ok - Are you sure you wish to wipe ${TMP}? (Y/n)"
        read WRITE_IP

        if [[ $WRITE_IP != "n" ]]; then
            rm -rf $TMP
        fi
    fi
}

# for file in bench/*.js; do
#     echo "Running $file"
#     FAILED=0
#     node $file || FAILED=1
#     if [[ ${FAILED} != 0 ]]; then
#         echo "***** ERROR: $file failed to run *****"
#         failures=$((failures+1))
#     else
#         success=$((success+1))
#     fi
# done
#
# if [[ ${failures} == 0 ]]; then
#     echo "Success: All ${success} benchmarks ran to completion without errors"
#     exit 0
# else
#     echo "Error: $failures benchmarks failed to run (${success} succeeded)"
#     exit 1
# fi


VERB=$1

case $VERB in
    download)   download $2 $3 $4 $5;;
    run)        run $2 $3 $4 $5;;
    clean)      clean;;
    *)          echo "not ok - invalid command" && exit 3;;
esac
