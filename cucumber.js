module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['step-definitions/**/*.ts'],
    format: ['@cucumber/pretty-formatter'],
    paths: ['features/**/*.feature'],
  },
};