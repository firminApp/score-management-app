require('dotenv').config();
const {readdirSync} = require('fs');
const path = require('path');
const collections = {};
const mongoose = require('mongoose');
const http = require('http')
const { Server } = require("socket.io");

let socket_port="3003"


db().catch(err => console.log(err));
async function db() {
    let file_path = __dirname + '/' + (process.env.models_path || 'models');
    console.log("file_path",file_path);
    readdirSync(file_path).forEach(function (file) {
    let name = path.basename(file, '.js');
    console.debug("MONGODB Loading model:", {name, file});
    collections[name] = require(file_path + '/' + file);  
    });
    await mongoose.connect(process.env.DB_STRING);
    let app = require('./routes/index').app;
    app.set('views', path.join(__dirname, 'views'));
    let server = http.createServer(app)
    const io = new Server(server);

    let port=process.env.PORT||3300;
    //server.listen(port);
    io.on('connection', (socket) => {
        socket.broadcast.emit('leaderbord',{data:{no:"data"}});
        console.log('a user connected');
      });
      server.listen(port, () => {
        console.log('listening on *:'+port);
      });
    io.on("new_score",function(data){
        console.log("new score "+ data);
    })
    io.on('connection', (socket) => {
        socket.broadcast.emit('leaderbord');
      });
      io.emit("new_score",{test:"new score"});


       
}



