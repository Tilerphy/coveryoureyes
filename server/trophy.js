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

trophy.get("/my", (req, res)=>{

	var fedId = req.query["fedid"];
	var gameId = req.query["gameid"];
	var sqltemplate = "select "+
	"tr.id as id, tr.fedid as fedid, tr.trophyid as trophyid, tr.createtime as createtime, "+
	"t.name as trophyname, t.trophypoint as trophypoint, "+
	"g.name as gamename , g.id as gameid "+
	"from "+
	"game as g, "+
	"trophyrecord as tr, "+
	"trophy as t "+
	"where t.gameid = g.id and tr.trophyid = t.id and tr.fedid=?";
	var specificGame = " and g.id=?";
	if(!fedId){
		res.status(400);
		res.end();
		return;
	}
	var parameters = [fedId];
	if(gameId){
		sqltemplate = sqltemplate + specificGame;
		parameters[parameters.length] = gameId;
	}
	console.log(sqltemplate);
	helper.execute(sqltemplate, parameters, (err, result)=>{
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

trophy.get("/add", (req,res)=>{
	var fedId = req.query("fedid");
	var trophyId = req.query("trophyid");
	if(fedId && trophyId){
		helper.exists("trophyrecord", "trophyid=? and fedid=?", [trophyId, fedId], 
		()=>{
			res.status(400);
                       	res.end();
		},
		()=>{
			helper.insert("trophyrecord",{"createtime":Date.now(), "fedid":fedId,"trophyid":trophyId}, (err, result)=>{
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
	}else{
		res.status(400);
                res.end();
	}
});


module.exports = trophy;
