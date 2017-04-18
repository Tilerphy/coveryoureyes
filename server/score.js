var score = require("express").Router();
var helper = require("./sql");

score.get("/submit", (req,res)=>{
	var fedId = req.query["fedId"];
	var score  = req.query["score"] ? req.query["score"] : 0;
	var gameid = req.query["gameid"];
	if(fedId == null  || gameid ==null){
		res.status(400);
		res.json(false);
		res.end();
		return;
	}else{
		
		helper.exists("ranking", "fedId=? and gameid=?", [fedId, gameid], 
		()=>{
			helper.update("ranking",{"highscore":score},"fedId=? and gameid=? and highscore < ?", [fedId,gameid,score], (err, result)=>{
				if(!err){
					res.json(true);
					res.end();
					return;
				}else{
					res.json(err);
					res.end();
					return;
				}
			});
		}, 
		()=>{
			helper.insert("ranking", {"fedId":fedId, "highscore":score, "gameid":gameid, "createtime":Date.now(),"rank":0}, 
(err, 
result)=>{
				if(!err){
                                        res.json(true);
                                        res.end();
                                        return;
                                }else{
                                        res.json(err);
                                        res.end();
                                        return;
                                }
			});
		});
	}
	
	
});			

module.exports = score;
