const mongoose=require("mongoose");
const Game=require("../models/game");
const Team=require("../models/team");
exports.index = async function(req, res) {
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
    console.log(games);
    res.render("index",{teams:teams,games:games, leaderbord:leaderbord})
  };

exports.update_leader_board=async function(req,res){
  console.log("new request");
  let data=await classifyTeams();
  console.log("data",data);
  res.json({data:data})
}
async function calculateTeamMarks(){
  let team_marks=[];
  let teams= await Team.find({});
  for(let team of teams){
    let marks=0;
    let gools=0;
    let played_games=await Game.find({$or:[{team_1_id:team._id},{team_2_id:team._id}]});
    if(played_games && played_games.length>0){
      for(let game of played_games){
        if(game.score_team_1==game.score_team_2){
          marks+=1;
          gools+=game.score_team_1;

        }else if(game.score_team_1>game.score_team_2){
          //team 1
          if(team._id==game.team_1_id){
            marks+=3;
            gools+=game.score_team_1;
          }else{
            gools-=game.score_team_2;
          }

        }else{
          //team 2
          if(team._id==game.team_2_id){
            marks+=3;
            gools+=game.score_team_2;
          }else{
            gools-=game.score_team_1;
          }

        }
        
      }
      let team_result={
        marks:marks,
        goals:gools,
        name:team.name,
        _id:team._id ,
        played_match:played_games.length      
      }
      team_marks.push(team_result);
    }

  }
  return team_marks

}
async function classifyTeams(){
  let team_marks=calculateTeamMarks();
  return team_marks;//.sort((a,b)=>a.marks-b.marks);
}