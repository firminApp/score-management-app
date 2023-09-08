const mongoose=require("mongoose");
const Game=require("../models/game");
const ObjectId=mongoose.Types.ObjectId;
const { io } = require("socket.io-client");
const  socket=new io("ws://localhost:3300");
exports.index = async function(req, res) {
    let list= await Game.find({});
    console.log("list",list);
    //res.render("index",list)
    res.json({status:"success",data:list});
  };
  exports.store =async function(req, res) {
    let body=req.body;
    if(body.score_team_1!=body.score_team_2){
      if(body.score_team_1>body.score_team_2){
        body.winner_team_id=body.team_1_id;
      }else{
        body.winner_team_id=body.team_2_id;
      }
    }
    let created= await Game.create(body);
    socket.emit("new_score", created)
    return res.redirect("/")
  };
  exports.update = async function(req, res) {
    let body=req.body;
    let updated= await Game.update({_id:body._id},body);
    res.json({status:"success",data:updated});  };
  exports.view = async function(req, res) {
    let body=req.body;

   let  data= await Game.findById(body._id);
    res.json({status:"success",data:data});
  };
  exports.delete =async function(req, res) {
    let body=req.body;
   let data= await Game.deleteOne({_id:body._id});
    res.json({status:"success",data:"deleted"});
  };
 
  exports.form = function(req, res) {
    res.json({status:"success",data:"data"});
  };