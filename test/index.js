const { assert } = require('chai');

const generateCogentDataFromAST = require('../index');

it('should parse the AST and read functions properly', () => {
  const result = generateCogentDataFromAST();

  result.forEach((el) => {
    assert.isNotNull(el.functionName);
    assert.isNotEmpty(el.functionName);
    assert.isArray(el.args);
    assert.isNumber(el.argsLength);
  });
});
