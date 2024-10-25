const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app); // creating a server and passing it to socket.io
const io = socketio(server); // connecting server and socket.io

app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {

socket.on("send-location",function(data){//recived from backend
    io.emit("receive-location",{id:socket.id,...data});//sending to backend


});

socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id)
})

    console.log("connected");
});

app.get("/", function(req, res) {
   
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});


