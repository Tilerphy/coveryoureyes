var game = require("express").Router();
var helper = require("./sql");
game.get("/info", (req,res)=>{

	var gameId =req.query["gameid"];
	if(gameId){
		helper.query("game", "id=?", [gameId], ["id","name","icon","description"], (err, result)=>{
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
module.exports = game;

