const socket = io();

// Hide the chat area initially
document.getElementById('chat').style.display = 'none';

// Handle form submission to join chat
document.getElementById('go-button').addEventListener('click', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  if (username) {
    socket.emit('join', username);
    document.getElementById('particles-js').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    
  }
});

// Handle form submission to send message
document.getElementById('message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById('message-input').value.trim();
  if (message) {
    socket.emit('chat message', message);
    document.getElementById('message-input').value = '';
  }
});

// Handle incoming messages
socket.on('chat message', (data) => {
  nem = data.username;
  msg = data.message; 

  addmsg(nem , msg);

});

// Handle user joining the chat
socket.on('user joined', (username) => {

  add(`${username} has joined the chat`);

});

// Handle user leaving the chat
socket.on('user left', (username) => {
  add(`${username} has left the chat`);
});



function add(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  const container = document.getElementById('messages');
  container.appendChild(messageElement);
  container.scrollTop = container.scrollHeight;
}


function addmsg(usrnem, msg){
  const container = document.getElementById('messages');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg');
  const username = document.createElement('p');

  username.classList.add('username') ;
  const message = document.createElement('p') ;
  message.textContent = msg ; 
  message.classList.add('main-text');
  const date = new Date().toLocaleTimeString();

  
  
  username.innerHTML = `<span> <b> ${usrnem} </b> <i> ${date} </i> </span>`;
  msgDiv.appendChild(username);
  msgDiv.appendChild(message);
  msgDiv.classList.add('animate__animated');
  msgDiv.classList.add('animate__lightSpeedInLeft');
  

  container.appendChild(msgDiv);

  container.scrollTop = container.scrollHeight;


}

