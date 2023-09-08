require('dotenv').config();
const {readdirSync} = require('fs');
const path = require('path');
const collections = {};
const mongoose = require('mongoose');
const { Server } = require("socket.io");
let port=process.env.PORT||3300;
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
    let server = app.listen(port,function(){
      console.log('listening on *:'+port);
    })
    const io = new Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.broadcast.emit('new_score',{data:{no:"data"}});
        socket.emit("new_score",{data:"new connection message"});
        io.on("new_score",function(socket){
          socket.emit("new_score",{data:"new message"});
      })
    });
     
    
}


