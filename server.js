const express = require('express')
const app = express()

app.get('/',function(req,res){
    res.send('Hello sir !How can i help you?')
})

app.get('/chicken',(req,res)=>{
    res.send("Yes sir! Chicken is available")
})
app.get('/idli',(req,res)=>{
    var idli={
        'name':'rava idli',
        'size':'10 cm radius',
        'is_chutney':true
    }
    res.send(idli)
})


app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})