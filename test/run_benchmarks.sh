set -euo pipefail
#################################################################################
# GLOBALS                                                                       #
#################################################################################

export TMP=/tmp/fuzzy-phrase-bench

failures=0
success=0

# check if bench data is already there
if ! [[ -d $TMP ]]; then
    # should also check credentials
    echo "need to download the data"
    echo
    echo "downloading to tmp"
    echo
    ./scripts/download_test_data.sh download phrase us en latn
    echo
    echo "test data downloaded"
else
    echo "${TMP} folder present"
    echo "ok - Are you sure you wish to wipe ${TMP}? (y/n)"
    read WRITE_IP

    if [[ $WRITE_IP != "n" ]]; then
        rm -rf $TMP
    fi
    ./scripts/download_test_data.sh download phrase us en latn
    echo "test data downloaded"
fi

# run benchmarks in bench/

for file in bench/*.js; do
    echo "Running $file"
    FAILED=0
    node $file || FAILED=1
    if [[ ${FAILED} != 0 ]]; then
        echo "***** ERROR: $file failed to run *****"
        failures=$((failures+1))
    else
        success=$((success+1))
    fi
done

# output bench data
if [[ ${failures} == 0 ]]; then
    echo "Success: All ${success} benchmarks ran to completion without errors"
    exit 0
else
    echo "Error: $failures benchmarks failed to run (${success} succeeded)"
    exit 1
fi
