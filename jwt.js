//Jwt Authentication Middleware
const jwt=require('jsonwebtoken');

//middleware for verification of jwt token on sending request by user
const jwtAuthMiddleware=(req,res,next)=>{
    //Extract the JWT token from the request(authorization header)
    const token=req.headers.authorization.split(' ')[1]; //As when we want to access the token,the bearer is written first
    //then after space the token is written so using split method the 1th index contain the token
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
        
    }
    //now verify the token using secret key,token
    try{
        const decodedpayload=jwt.verify(token,process.env.JWT_SECRET);//IF token is verified,it returns the payload
        //We have to attach this decoded payload to the request so that it can tranfer to server
        req.userPayload=decodedpayload;
        next();

    }catch(error){
        console.log(error);
        return res.status(401).json({message:"Invalid token"})
       
    }
}

//Function to generate JWT token USING USER DATA
const generateJwtToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}
module.exports={jwtAuthMiddleware,generateJwtToken};