var user = require("express").Router();
var helper= require("./sql");
user.get("/register", (req, res)=>{
	var fedId = req.query["fedid"];
	var nickname = req.query["nickname"];
	var others = req.query["others"];
	var othersObj = others? JSON.parse(others) : null;
	if(fedId && nickname && othersObj){

		helper.exists("alluser", "fedId=?", [fedId], 
			()=>{
				helper.update("alluser", {nickname:nickname, others:others}, "fedId=?", [fedId], (err, result)=>{
					if(err){
						res.status(400);
						res.json(err);
						res.end();
					}else{
						res.json(true);
						res.end();
					}
				});
			}, 
			()=>{
				helper.insert("alluser", {nickname:nickname, others:others, fedId:fedId}, (err, result)=>{
					if(err){
                                                res.status(400);
                                                res.json(err);
                                                res.end();
                                        }else{
                                                res.json(true);
                                                res.end();
                                        }
				});
			});
	}else{
		res.status(400);
		res.json(false);
		res.end();
	}
});

user.get("/info", (req, res)=>{

	helper.query("alluser", "fedid=?", [req.query["fedid"]], ["id","fedid","nickname","others"], (err, result)=>{
		if(err){
                    	res.status(400);
                    	res.json(err);
                        res.end();
                }else{
                        res.json(result);
                        res.end();
                }
	});
});

module.exports = user;
