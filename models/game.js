const mongoose=require("mongoose");
const schema = new mongoose.Schema(
    { 
        team_1_id: { type:mongoose.Types.ObjectId, ref:"team" },
        team_2_id: { type:mongoose.Types.ObjectId, ref:"team" },
        score:{type:String},//t1:t2
        created_at: { type: Date, default: Date.now },    
        updated_at: { type: Date, default: Date.now }, 
    },

    );
    
module.exports = mongoose.model('Game', schema);;
