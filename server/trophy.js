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

trophy.get("/init", (req,res)=>{


});

trophy.get("/update", (req,res)=>{
	var fedId = req.query("fedId");
	var recordId =req.query("recordId");
	var val = req.query("val");
	if(fedId && recordId && val){
		helper.exists("trophyrecord", "recordId=? and fedid=?", [recordId, fedId], 
		()=>{
			helper.update("trophyrecord",{"endtime":Date.now(), "recordcount":val}  "recordId=? and fedId=?", [recordId, fedId], (err, 
result)=>{
				if(err){
                                	res.status(400);
                                	res.json(err);
                                	res.end();
                        	}else{
                                	res.json(result);
                                	res.end();
                        	}
			});
		}, 
		()=>{
			res.status(400);
			res.end();
		});
	}else{
		res.status(400);
                res.end();
	}
});


module.exports = trophy;
