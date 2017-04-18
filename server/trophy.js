var trophy = require("express").Router();
var helper = require("./sql");
trophy.get("/info", (req,res)=>{
	var trophyId = req.query["id"];
	if(trophyId){
		helper.query("trophy", "id=?", [trophyId], ["id","gameid","name","trophypoint","icon"], (err, result)=>{
			if(err){
				res.status(400);
				res.json(err);
				res.end();
			}else{
				res.json(result);
				res.end();
			}
		});
	}else{
		res.status(400);
		res.end();
	}
});
module.exports = trophy;
