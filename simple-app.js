const express = require('express');
const app =express();
const port = 3000;

let accounts = [
    {
      "id": 1,
      "username": "paulhal",
      "role": "admin"
    },
    {
      "id": 2,
      "username": "johndoe",
      "role": "guest"
    },
    {
      "id": 3,
      "username": "sarahjane",
      "role": "guest"
    }
  ];
  
app.listen(port, ()=>{
    console.log("server listening on port 3000");
})

app.get("/",(req,res)=>{
    res.send('hello world');
});

app.get("/accounts",(req,res)=>{
    res.json(accounts);
});

app.get("/accounts/:id",(req,res)=>{
    const accountId = Number(req.params.id);
    const account = accounts.find((acc)=>acc.id === accountId);

    if(account){
        res.json(account);
    }else{
        res.status(404).send('account not found');
    }
    
});

app.put("/accounts/:id",(req,res)=>{
    const accountId = Number(req.params.id);
    let account = accounts.find((acc)=>acc.id === accountId);
    console.log(req.query);
    if(account){
        account.username = req.query.username;
        account.role=req.query.role;
        
        res.send(account);
    }else{
        res.status(404).send('not found');
    }
    
});

app.post("/accounts",(req,res)=>{
    if(req.query.hasOwnProperty('username','role')){
        console.log('fine');
        const newAccount = { "id" : accounts.length+1, "username" : req.query.username, "role" :req.query.role};
        accounts.push(newAccount);
        res.status(201).send(newAccount);
      }else{
        res.status(400).send();
      }
});

app.delete("/accounts/:id",(req,res)=>{
    const accountId = Number(req.params.id);
    let account = accounts.find((acc)=>acc.id === accountId);
    if(account){
        accounts.splice(accountId-1,1);
        console.log(accounts);
        res.status(200).send(accounts);
    }else{
        res.status(404).send("not found");
    }
});

