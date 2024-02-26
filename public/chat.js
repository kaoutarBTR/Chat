
var socket = io.connect('http://localhost:8080');
var pseudo= test;
// chat.js


// chat.js
//console.log('La valeur de myVariable est :', pseudo);
document.title = pseudo + '-' + document.title;
alert("Bonjour, " + pseudo );
///::sjdcjidciodnciozen

socket.emit('pseudo',pseudo);

document.getElementById('chatForm').addEventListener('submit' , (e)=>{
    e.preventDefault();
    const textInput = document.getElementById('msgInput').value;
    document.getElementById('msgInput').value = '';
    if(textInput.length >0){
        socket.emit('newMessage',textInput);

        createElementFunction('newMessageMe' , textInput)

    }else{
        return false;
    }

})

//console.log(' chate.js  element test:');
//evenements
socket.on('newUser', (pseudo)=>{

    createElementFunction('newUser', pseudo);

});

socket.on('newMessageAll' , (content)=>{

    createElementFunction('newMessageAll' , content);

})


socket.on('writing' , (pseudo)=>{

    document.getElementById('isWriting').textContent = pseudo + ' est en train d\'écrire';

})

socket.on('notWriting', ()=>{

    document.getElementById('isWriting').textContent = '';
})

socket.on('quitUser',(pseudo)=>{
    createElementFunction('quitUser', pseudo);
})





//fonctions


function writing(){
    socket.emit('writing',pseudo);
}

function notWriting(){
    socket.emit('notWriting');
}




function createElementFunction(element,content){

   // console.log(' chate.js  element test:createdelement :)');
    const newElement = document.createElement('div');
    switch(element){

        case 'newUser':
            newElement.classList.add(element , 'message');
            newElement.textContent = content + ' a rejoint le chat!';
            document.getElementById('msgContainer').appendChild(newElement);
            break;

        case 'newMessageMe':
            newElement.classList.add(element , 'message'); 
            newElement.innerHTML = pseudo + ': ' + content;
            document.getElementById('msgContainer').appendChild(newElement);
            break;


         case 'newMessageAll':
            newElement.classList.add(element , 'message'); 
            newElement.innerHTML = content.pseudo + ': ' + content.message;
            document.getElementById('msgContainer').appendChild(newElement);
            break;



        case 'quitUser':
                newElement.classList.add(element , 'message');
                newElement.textContent = content + ' a quitté le chat!';
                document.getElementById('msgContainer').appendChild(newElement);
                break;

    }
}


//createElementFunction('newUser', test);

//import { user } from '../server.js';



//var pseudo= user;
//while(!pseudo){
    //var pseudo = prompt('quel est ton nom');
//}


// chat.js




//var socket = io();

//var pseudo= server.getUsername();
//console.log(pseudo +'chat');
//console.log('chat' + user);