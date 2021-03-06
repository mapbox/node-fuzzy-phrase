set -euo pipefail
#################################################################################
# GLOBALS                                                                       #
#################################################################################

export TMP=/tmp/fuzzy-phrase-bench

failures=0
success=0

# need to first check credentials

# check if bench data is already there
if ! [[ -d $TMP ]]; then
    # should also check credentials
    echo "Downloading test data to /tmp/ directory... "
    ./scripts/download_test_data.sh download phrase us en latn
    echo
    echo "Test data downloaded"
else
    echo "${TMP} folder present"
    echo "${TMP} data exists - would you like to wipe ${TMP}? (y/n)"
    read WRITE_IP

    if [[ $WRITE_IP != "n" ]]; then
        rm -rf $TMP
        ./scripts/download_test_data.sh download phrase us en latn sample
        echo "Test data downloaded"
    fi
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
