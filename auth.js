//To handle authentication using Passport.js by implementing local authentication strategy
const passport = require('passport'); // Import passport for authentication
const LocalStrategy = require('passport-local').Strategy; // Import LocalStrategy for local authentication
const person = require('./models/person'); // Import the person model


//Setting the verification method for passport.js
passport.use(new LocalStrategy (async(username,password,done)=>{  //these three should be used in same convention
    try{
        const user= await person.findOne({username:username});
        //find user in db
        if(!user){
            return done(null,false,{message:'Incorrect username'});//If user not found, return false
        }

        //the comparePassword method is defined in the person model
        const isPassword=await user.comparePassword(password); //Compare the password with the hashed password in the database
        if(isPassword){
            return done(null,user);//If password matches, return user
        }else{
            return done(null,false,{message:'Incorrect password'});//If password does not match, return false
        }
//enter username and password in params when session is false

    }catch(err){
        console.log("Error in passport authentication:", err);
        done(err);
    }
}
));

module.exports=passport;