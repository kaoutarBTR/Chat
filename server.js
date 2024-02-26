var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var collection = require("./mongodb");
const { Console } = require('console');
var myVariable;


app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/home', (req, res) => {
  res.render('home.ejs' ); // Passez la valeur à la vue EJS
});


app.get('/signup', function(req, res){
    res.render('signup.ejs'); // Rendre la page signup avec EJS
});

app.get('/login', function(req, res){
    res.render('login.ejs'); // Rendre la page login avec EJS
});


////////ici   

//app.get("/testhome", (req, res) => {
//    res.render("home");
//});


//app.get('/home', function(req, res){
// res.setHeader('Content-type','text/html');

//res.sendFile(__dirname + '/views/home.ejs');
//});
 
//route post pour gerer la connexion de l'utilisateur
app.post("/home", async(req,res)=>{

    try{
        //recuperer les informations de l'utilisateur depuis la base de donees
        const check = await collection.findOne({utilisateur: req.body.username});
        if(!check){
            
            req.send('<p style="color: red;">Nom d\'utilisateur introuvable. Veuillez créer un compte ou essayer un nouveau nom d\'utilisateur.</p>');

        }
      
       if (req.body.password === check.password) {
        /////////////////////////////////////////////////////
       //chat.setUsername(req.body.username);
       myVariable = req.body.username;

       // Attacher myVariable à l'objet locals
       res.locals.myVariable = myVariable;
       console.log("Variable attachée à locals MODIIIIIF:", res.locals.myVariable);

        
       //console.log(req.body.username);
           res.render("home.ejs");

          

        }else{

            res.send('<p style="color: red;">Mot de passe incorrect.</p>');

        }

    }catch{
        //en cas d'erreur renvoyer un message d'erreur
        //res.send("Error404 XD");
        res.send("Error404 nom d'utilisateur introuvable");


    }
})




app.use(function(req, res, next) {
    // Définir la valeur de la variable

    // Attacher la variable à l'objet locals
    res.locals.myVariable = myVariable;
    console.log("Variable attachée à locals :", res.locals.myVariable);

    next();
});






//post pour gerer l'inscription de l'utilisateur
app.post("/signup", async ( req,res)=>{
    const data = {
        utilisateur: req.body.username,
        password: req.body.password,

    }
    //un seul nom dutilisateur
    const existinguser = await collection.findOne({utilisateur: data.utilisateur})
    if(existinguser){
        res.send("Ce nom d'utilisateur existe deja. Veuillez choisir un nouveau nom d'utilisateur ou allez vers Se connecter ");
    }
    else{
        const userdata = await collection.insertMany(data);
    console.log(userdata);
    }


    
})


app.use(express.static(__dirname + '\\'+'public'));

app.get('/', function(req, res){

    res.render('test.ejs');
});






app.use(function(req, res,next){
    res.setHeader('Content-type','text/html'); 
    res.status(404).send('Page introuvable ');
});

var io = require('socket.io')(server);

 
io.on('connection', (socket)=>{
    socket.on('pseudo', (pseudo)=>{
        
        socket.pseudo=pseudo;
        socket.broadcast.emit('newUser',pseudo);
        console.log("Test défini :", socket.pseudo);
    })

    socket.on('newMessage' , (message)=>{
        socket.broadcast.emit('newMessageAll' , {message: message , pseudo: socket.pseudo});
        console.log("Test défini :", message);
    })

    socket.on('writing' , (pseudo)=>{
        socket.broadcast.emit('writing',pseudo);
    })

    socket.on('notWriting',()=>{
        socket.broadcast.emit('notWriting')
    })


    socket.on('disconnect',()=>{
        socket.broadcast.emit('quitUser',socket.pseudo);
    })


})




server.listen (8080, ()=> console.log('Server started at 8080 '));

console.log("modification faite");



//console.log('test SER');
