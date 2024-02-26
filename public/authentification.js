let creerCompte = document.getElementById("creerCompte");
let connection =  document.getElementById("Connection");
let title =  document.getElementById("title");
let confirmPassword = document.getElementById('confirmPassword');
let allez = document.getElementById('allez');

creerCompte.onclick = function(){
    title.innerHTML = "Creer un compte";
    creerCompte.classList.add("disable");
    connection.classList.remove("disable");
    confirmPassword.style.display = 'block';


}

connection.onclick = function(){
    title.innerHTML = "Se connecter";
    creerCompte.classList.remove("disable");
    connection.classList.add("disable");
    confirmPassword.style.display = 'none';
}

allez.onclick = function(){
   
    window.location.href ="/home";
}


