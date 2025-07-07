var a=59;
var b=30;
var ans=a+b;
console.log("Hlo"+ ans);

var cars=["tesla","bmw","audi"];
console.log(cars);
cars.push("range rover");
console.log(cars[0]);
console.log(cars);

var prompt=require("prompt-sync")();
var a=prompt("Enter your age");
if(a>=18){
    console.log("You can vote");
}else{
    console.log("You cannot vote");
}
var z=4
for(var i=z;i>=0;i--){
    console.log(i);
}

var human={
    name:"Himanshi",
    age:20,
    hobbies:["sleeping","eating","music"],
    isStudent:true
};
console.log(human.name);
console.log(human);

//filter method
//filter method is used to create a new array from original array that satisfy the specified condition that is passed
//as an argument to filter method
var nums=[24,56,9,76,36];
var result=nums.filter(checkNum);

function checkNum(num){
    return num<38;
}
console.log(result);


