const mongoose=require("mongoose");
const Team=require("../models/team");
exports.index = async function(req, res) {
    let list= await Team.find({});
    console.log("list",list);
    res.json({status:"success",data:list});
  };
  exports.store =async function(req, res) {
    console.log("storing");
    let body=req.body;
    console.log("body",body);
    let created= await Team.create(body);
    res.json({status:"success",data:created});

  };
  exports.update = async function(req, res) {
    let body=req.body;
    let updated= await Team.update({_id:body._id},body);
    res.json({status:"success",data:updated});  };
  exports.view = async function(req, res) {
    let body=req.body;
    data= await Team.findById(body._id);
    res.json({status:"success",data:data});
  };
  exports.delete =async function(req, res) {
    let body=req.body;
    let data= await Team.deleteOne({_id:body._id});
    res.json({status:"success",data:"deleted"});
  };
 
  exports.form = function(req, res) {
    res.json({status:"success",data:"data"});
  };