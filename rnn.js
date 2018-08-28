const brain = require('brain.js')
const fs = require('fs')
const data = fs.readFileSync('./data/commentPairs.txt')
const parsedData = JSON.parse(data)

const lstm = new brain.recurrent.LSTM({
  activation: 'sigmoid', // activation function
  hiddenLayers: [3]
});

lstm.train(parsedData, { iterations: 10000, log: true, learningRate: 0.3, callback: (data)=>{
  console.log('iteration sample: ' + lstm.run('Hello, how are you today?'))} })

const JSONbrain = JSON.stringify(lstm.toJSON())

fs.writeFileSync('./data/brain.txt', JSONbrain);

const run1 = lstm.run('Hey guys');
const run2 = lstm.run('Where should we go next?');
const run3 = lstm.run('Where go here?');

console.log('run 1: ' + run1);
console.log('run 2: ' + run2);
console.log('run 3: ' + run3);
