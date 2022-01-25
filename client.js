// const { fuchsia } = require("color-name");

// const { setTimeout } /= require("timers/promises");

const socket=io("http://localhost:8000");
const form=document.getElementById("send-cont");
const messageiput=document.getElementById("messageinp")
const messagecontaianer=document.querySelector(".container")



function appendd(message,position){
    const msgelmnt=document.createElement('div')
    msgelmnt.innerText=message;
    msgelmnt.classList.add('message');
    msgelmnt.classList.add(position);
    messagecontaianer.append(msgelmnt);
    console.log("function is runnign")
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(messageiput.value==''){
        alert("please do not send a blank message")
    }
    const messaes=messageiput.value;
    appendd(`You: ${messaes}`, 'right');
    socket.emit('send', messaes);
    messageiput.value='';
})

const asdada=prompt("enter your name to join: ");
socket.emit('user-joined', asdada);

socket.on('user-joined', naam=>{
    appendd(`${naam} joined the chat`, 'right');
})

socket.on('receive', daata=>{
    appendd(`${daata.name}: ${daata.message} `, 'left');
})

socket.on('left', nameeda=>{
    appendd(`${nameeda} left the chat`, 'left');
})
