module.exports = {
  testEnvironment: 'node',
  testMatch: ['tests/jest/**/?(*.)+(test).[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.[jt]sx?$': '@swc/jest'
  }
}
