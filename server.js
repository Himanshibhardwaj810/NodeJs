var add=function(a,b){
    return a+b;
}
var result=add(11,22);
console.log(result);
//or
function subtract(a,b){
    return a-b;
}
// Arrow function
var multiply = (x,y) => {return x*y;}
var divide =(x,y) => x/y;

console.log(multiply(5,6));
console.log(divide(20,4));
var ans=subtract(10,5);
console.log(ans);

//self-invoking function
(function (){
    console.log("This is a self-invoking function");
})();