const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const {spawn} = require('child_process');

//Use Folder

app.use(express.static('./dominic'));
app.use(express.static('./main'));


app.get('/diabetes',(req,res)=>{
res.sendFile(__dirname+"/main/index.html");
});

app.get('/result',(req,res)=>{
    var glucose = req.query.glucose;
    var bmi = req.query.bmi;
    var age = req.query.age;
    var bp = req.query.bp;
    var insulin = req.query.insulin;
    var dpdf = req.query.dpdf; 
    const pythons = spawn('python',['diabetes.py', glucose,bmi,age,bp,dpdf,insulin]);    
    pythons.stdout.on('data',(data)=>{
        res.json(data.toString());
    });
});


app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("http://localhost:"+PORT);
    }
})