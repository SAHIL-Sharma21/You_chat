const socket = io()

//prompt for username
let userName;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do {
    userName = prompt('Please enter your name');
} while (!userName);

textArea.addEventListener('keyup', (e) => {
    if( e.key === 'Enter')  {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }
    //append message
    appendMessage(msg, 'outgoing');
    textArea.value = '';
    scrollToBottom();

    //send to server via web socket connection
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4> ${msg.user} </h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

//Recieve message
socket.on('message', (msg) => {
    // console.log(msg);
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

//scroll to bottom
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}