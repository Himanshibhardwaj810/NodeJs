function callback(){
    console.log("Callback function executed");
}

var add=function(a,b,callback){
    var result=a+b;
    console.log("The sum is: " + result);
    callback();//this function is executed after the add function completes
}

add(12,78,callback);

//Short hand notation
var subtract= function (x,y,himanshi){
    var result=x-y;
    console.log("The difference is: " + result);
    himanshi();
}

subtract(100,30,function(){
    console.log("the code is written by himanshi")
});
//another short hand trick example
subtract(50,20,()=>{
    console.log("This is another callback function example");
});
subtract(566,20,()=> console.log("This is another callback function example"));