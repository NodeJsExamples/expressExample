const express=require('express');
const port=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(port, function(){
    console.log("Express esimerkki portissa "+port);
});
app.get('/',function(request,response){
    response.send("Express API esimerkki: "+port);
});

app.get('/second',function(request,response){
    console.log("SECOND endpoint");
    response.send('Olen endpoint second');
});

//middleware on funktio joka suoritetaan ilman kutsua, kunhan
//koodissa edetään siihen asti. Sen tunnistaa sanasta use

app.use(function(request,reponse,next){
    console.log('Middleware suoritettiin');
    next();
});

//fname on pakko antaa
app.get('/hello/:fname',function(request,response){
    response.send("Terve "+request.params.fname);
});

//fname voi olla puuttuva
app.get('/hello2/:fname?',function(request,response){
    if(request.params.fname){
        response.send("Terve "+request.params.fname);
    }
    else{
        response.send("Terve vieras");
    }
});

//post esimerkki
app.post('/',function(request,response){
    response.json(request.body.fname)
    console.log(request.body);
    //reponse.send(request.body);
});

//put esimerkki
app.put('/:id',function(request, response){
    console.log("Päivitetää tietue, jossa id="+request.params.id);
    console.log(request.body);
    response.json(request.body);
});


module.exports=app;