const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login");

//checker la connexion a la base de donnees
connect.then(()=>{
    console.log("Base de données connectée");

})
.catch(()=>{
    console.log("Connexion a la base de données echouée");
});
const LoginSchema = new mongoose.Schema({
    utilisateur:{
        type:String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }

});

const collection = new mongoose.model("users",LoginSchema );

module.exports = collection;



