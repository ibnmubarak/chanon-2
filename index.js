const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve the main page from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle chat page route
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('user joined', username);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('user left', socket.username);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { username: socket.username, message: msg });
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
