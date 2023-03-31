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

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the exact partitionKey property when given input with partitionKey", () => {
    const trivialKey = deterministicPartitionKey(PARTITION_KEY_EVENT_MOCK);
    expect(trivialKey).toBe(PARTITION_KEY_MOCK);
  });

  it("Returns hash string with maximum 256 characters when given input with no partitionKey property", () => {
    const trivialKey = deterministicPartitionKey(NO_PARTITION_KEY_EVENT_MOCK);
    expect(trivialKey.length <= 256).toBe(true);
  });

  it("Returns different hash strings with maximum 256 characters for inputs with different structure", () => {
    const trivialKey1 = deterministicPartitionKey(NO_PARTITION_KEY_EVENT_MOCK);
    const trivialKey2 = deterministicPartitionKey(NO_PARTITION_KEY_EVENT_MOCK_2);
    expect(trivialKey1.length <= 256).toBe(true);
    expect(trivialKey2.length <= 256).toBe(true);
    expect(trivialKey1 !== trivialKey2).toBe(true);
  });
});
