const mongoose=require("mongoose");
const Game=require("../models/game");
exports.index = async function(req, res) {
    let list= await Game.find({});
    console.log("list",list);
    res.render("index",list)
   // res.json({status:"success",data:"data"});
  };
  exports.store =async function(req, res) {
    let body=req.body;
    let created= await Game.create(body);
    res.json({status:"success",data:created});

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