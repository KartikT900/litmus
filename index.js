const fs = require('fs');
const { Parser } = require('acorn');

// Currently only contains simple functions with non-existent function body
const sampleJSCode = fs.readFileSync(`./mockInput.js`);

const parsedAST = Parser.parse(sampleJSCode, {
  ecmaVersion: 'latest'
});

const isFunction = (type) => type === 'FunctionDeclaration';

function generateCogentDataFromAST() {
  // currently only navigating basic JS functions
  return parsedAST.body.reduce((acc, curr) => {
    const functionAST = isFunction(curr.type);
    if (functionAST) {
      const [...args] = curr.params;

      acc.push({
        functionName: curr.id.name,
        argsLength: curr.params.length,
        args: args.reduce((arg, p, index) => {
          arg.push({
            [`arg${index}`]: p.name
          });

          return arg;
        }, [])
      });
    }

    return acc;
  }, []);
}

module.exports = generateCogentDataFromAST;
