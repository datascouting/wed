module.exports = {
  parserOptions: {
    sourceType: "module"
  },
  env: {
    node: true,
  },
  rules: {
    "import/no-extraneous-dependencies": "off",
    "indent": ["error", 2, {
      "ArrayExpression": "first"
    }]
  }
};
