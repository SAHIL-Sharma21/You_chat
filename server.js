const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;




//using static middleware for serving style files
app.use(express.static(__dirname + '/public'))


//creating route
app.get("/", (req, res) => {
    // res.send('Hello World');
    res.sendFile(__dirname + "/index.html");
})


//socket 
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('connected...');
    socket.on('message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('message', msg)
    });
});






http.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})