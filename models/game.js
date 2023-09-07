const mongoose=require("mongoose");
const schema = new mongoose.Schema(
    { 
        team_1_id: { type:mongoose.Types.ObjectId, ref:"team" },
        team_2_id: { type:mongoose.Types.ObjectId, ref:"team" },
        score_team_1:{type:Number, default:0},//t1:t2
        score_team_2:{type:Number, default:0},//t1:t2
        created_at: { type: Date, default: Date.now },    
        updated_at: { type: Date, default: Date.now }, 
    },

    );
    
module.exports = mongoose.model('Game', schema);;
