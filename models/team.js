const mongoose=require("mongoose");
const schema = new mongoose.Schema(
    { 
        name: { type:String },
        created_at: { type: Date, default: Date.now },    
        updated_at: { type: Date, default: Date.now }, 
    },

    );
    
module.exports = mongoose.model('Team', schema);;
