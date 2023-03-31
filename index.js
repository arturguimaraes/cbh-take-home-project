const { deterministicPartitionKey } = require("./dpk");

const PARTITION_KEY_MOCK = '1234567890';
const PARTITION_KEY_EVENT_MOCK = {
    partitionKey: PARTITION_KEY_MOCK
};
const NO_PARTITION_KEY_EVENT_MOCK = {
    property: 'test'
};
const NO_PARTITION_KEY_EVENT_MOCK_2 = {
    property: {
        childProperty: 'test'
    }
};

function printKey(deterministicPartitionKey) {
    console.log(`Key: ${deterministicPartitionKey} | Length: ${deterministicPartitionKey.length}`);
}

printKey(deterministicPartitionKey());
printKey(deterministicPartitionKey(PARTITION_KEY_EVENT_MOCK));
printKey(deterministicPartitionKey(NO_PARTITION_KEY_EVENT_MOCK));
printKey(deterministicPartitionKey(NO_PARTITION_KEY_EVENT_MOCK_2));