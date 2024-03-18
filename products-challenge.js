const express = require('express');
const app = express();
const port = 4000;


app.use((req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('something went wrong');
})
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];

app.get('/products',(req,res)=>{
    res.send(products);

});

app.get('/products/:id(\\d+)',(req,res)=>{
    res.send(products[req.params.id-1]);
});

app.get('/search',(req,res)=>{
    let queryProduct = [];
    for(const product of products){
        if(product.price<=req.query.max&&product.price>=req.query.min){
            queryProduct.push( product);
        }
    }

    if(queryProduct){
        res.send(queryProduct);
    }else{
        res.status(404).send();
    }
    
});

app.get('/products/search',(req,res)=>{
    res.send('hello');
    
});

app.post('/products',(req,res)=>{
    if(req.query.hasOwnProperty("name","price")){
        const newProduct = { id : products.length + 1, 
            name : req.query.name, price : req.query.price};
        products.push(newProduct);
        res.send(products);
    }else{
        res.status(402).send('missing properties');
    }
    
});

app.put('/products/:id',(req,res)=>{
    const product = products[req.params.id-1];

    if(product){
        product.name = req.query.name;
        product.price= req.query.price;
        res.send(product);
    }else{
        res.status(401).send('not found');
    }
});

app.delete('/products/:id',(req,res)=>{
    const index = req.params.id - 1;
    if(products[index]){
        products.splice(index,1);
        for( let i = index; i < products.length; i++){
            products[i].id--;
        }
        res.send(products);
    }else{
        res.status(403).send('product doesn\'t exist');
    }
});
