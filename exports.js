const greeting=require('./export_main.js');
console.log(greeting);
console.log("this is exports.js file my friend don't get confused");

console.log(greeting.num);
var result=greeting.addNumber(greeting.num+5,10);
console.log(result);
