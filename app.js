require('dotenv').config();
const {readdirSync} = require('fs');
const path = require('path');
const collections = {};
const mongoose = require('mongoose');
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
    const app = require('./routes/index').app;
    let port=process.env.PORT||3300;
    app.listen(port, function() {
        console.log('Server listening on port '+port);
        
    });
}



