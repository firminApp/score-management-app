const mongoose=require("mongoose");
const Game=require("../models/game");
const Team=require("../models/team");
const { io } = require("socket.io-client");
const  socket=new io("ws://localhost:3300");
const ObjectId=mongoose.Types.ObjectId;
const moment= require("moment")
exports.index = async function(req, res) {
socket.emit("new_score","new")
socket.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

    socket.on("new_score", function(data){
      console.log("new score", data)
    });
    let teams=await Team.find({});
    let team_1_lookup = {
      $lookup: {
          from: "teams",
          localField: "team_1_id",
          foreignField: "_id",
          as: "team_1"
      }
  };
  let team_1_unwind = {
    $unwind: {
        path: "$team_1",
        preserveNullAndEmptyArrays: true
    }
};

  let team_2_lookup = {
    $lookup: {
        from: "teams",
        localField: "team_2_id",
        foreignField: "_id",
        as: "team_2"
    }
};
let team_2_unwind = {
  $unwind: {
      path: "$team_2",
      preserveNullAndEmptyArrays: true
  }
};
    let pipeline=[
      team_1_lookup,
      team_1_unwind,
      team_2_lookup,
      team_2_unwind
    ]
    let games= await Game.aggregate(pipeline); 
    let leaderbord=await classifyTeams(); 
    res.render("index",{teams:teams,games:games, leaderbord:leaderbord, moment})
  };

exports.update_leader_board=async function(req,res){
  let data=await classifyTeams();
  res.json({data:data})
}
async function calculateTeamMarks(){
  let team_marks=[];
  let teams= await Team.find({});
  for(let team of teams){
    let marks=0;
    let playeds=0;
    let win=0;
    let nulls=0;
    let lost=0;
    let goals_diff=0;
    let played_games=await Game.find({$or:[{team_1_id:team._id},{team_2_id:team._id}]});
    playeds=played_games.length;
    if(played_games && played_games.length>0){
      for(let game of played_games){
        let check=JSON.stringify(team._id)==JSON.stringify(game.winner_team_id);
        if(game.winner_team_id){
          if( check){
            //win
            marks+=3;
            win++;
            goals_diff+=game.score_team_1>game.score_team_2?game.score_team_1:game.score_team_2;
          }else{
            //lost
            lost++;
            goals_diff-=game.score_team_1>game.score_team_2?game.score_team_1:game.score_team_2;

          }

        }else{
          //null
            marks+=1;
            nulls++;
            goals_diff+=game.score_team_1;
        }
     
    }
  }
    let team_result={
      marks:marks,
      goals_diff:goals_diff,
      win:win,
      lost:lost,
      nulls:nulls,
      name:team.name,
      _id:team._id ,
      played_match:playeds      
    }
    team_marks.push(team_result);
  }
  return team_marks

}

async function classifyTeams(){
  let team_marks=await calculateTeamMarks();
  //console.log("marks",team_marks);
  return team_marks.sort((a,b)=>b.marks-a.marks);//.sort((a,b)=>b.goals_diff-a.goals_diff);
}
exports.deletAllGames=async function(req,res){
  await Game.deleteMany({});
  return res.redirect("/")
}