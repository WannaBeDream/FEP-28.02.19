const _ = require('lodash');
const app = require('./src/index.js');
const app1 = require('./src/index.js');
const app2 = require('./src/index.js');

require('./src/app');

console.log('Hello world', app.add(2, 3));
console.log(app.counter())
console.log(app.counter())
console.log(app1.counter())
console.log(app2.counter())
const arr = [2,3,4];

// _.forEach(arr,(a)=> console.log(a));