const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('./ring.mp3');


const append = (message , position)=>{
  const messageElement   = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position == 'left'){
    audio.play();
  }
}

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value = "";


})

const enteredName = prompt("PLEASE ENTER YOUR NAME BEFORE JOINING");

socket.emit('new-user-joined' ,enteredName);

socket.on('user-joined' , enteredName =>{
    append(`${enteredName} joined the chat` , 'right');
    
})

socket.on('receive' , data =>{
    append(`${data.enteredName} : ${data.message}` , 'left');
    
})

socket.on('left' , enteredName=>{
    append(`${enteredName} left the chat` , 'left');
})

