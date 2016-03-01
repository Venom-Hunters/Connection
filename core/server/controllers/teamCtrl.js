var Team = require("./../models/teamModel");

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

module.exports = {

	create: function(req, res, next) {
		if (req.user && req.user._id)
		{


		var newTeam = new Team();
		newTeam.teamName = req.body.teamName;
		newTeam.members = [req.user._id];
		newTeam.teamLead = req.user._id;
		newTeam.creationDate = new Date();
		/*newTeam.regToken = req.body.regToken;*/
		newTeam.save(function(err, result) {
		if (err) { return res.sendStatus(500); }

		Team.findOne({_id: result._id}, function(err, result) {
			if(err) { res.sendStatus(500); }
				var active = result;
				Team.find({
					members: req.user._id
				})
				.sort("-teamName")
				.populate("members teamLead")
				.exec(function(err, results) {
					return res.send({
						active: active,
						all: results
					});
				});
		}).populate("members teamLead");
		});

		/*
		Hash regToken?
		newTeam.regToken = newTeam.generateHash(req.body.regToken).then(function(response) {
			newTeam.regToken = response;
			newTeam.save(function(err, result) {
				if (err) res.sendStatus(500);
				else res.send(result);
			})
		})	*/
	} else {
		res.sendStatus(500);
	}
	},

	getTeams: function(req, res, next) {
		if (req.user) {
		Team
		.find({$or: [{"members": req.user._id}, {"teamLead": req.user._id}]})
		.populate("members teamLead")
		.exec(function(err, teams) {
			if (err) res.sendStatus(500);
			else if (!teams) res.sendStatus(404);
			else res.send(teams);
		});
	} else {
		res.sendStatus(500);
	}

	},

	deleteTeam: function(req, res, next) {
		Team.findOneAndRemove({_id: req.params.teamId}, function(err, result) {
			if (err) return res.sendStatus(500);
			else if (!result) return res.sendStatus(404);
			else return res.send(result);
		});
	},

	updateTeamProfile: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) return res.sendStatus(500);
			else {
				team.teamName = req.body.teamName;
				team.save(function(err, result) {
					if (err) return res.sendStatus(500);
					else return res.send(result);
				});
			}
		});
	},
	getTeamInfo: function(req, res, next) {
		Team
			.findById(req.params.teamId)
			.populate("members teamLead")
			.exec(function(err, team) {
				if (err) return res.sendStatus(500);
				else return res.send(team);
			});
	},
	addMembers: function(req, res, next) {
		var membersToAdd = [];
		Team.findById(req.params.teamId, function(err, team) {
			if (err) return res.sendStatus(500);
			else {
				var proposedMembers = req.body;
				proposedMembers.forEach(function(proposedMember) {
					var duplicate = false;
					for (var i = 0; i < team.members.length; i++) {
						if (team.members[i]) {
							team.members[i] = team.members[i].toString();
							if (team.members[i] === proposedMember._id) {
								duplicate = true;
							}
						}
					}
					if (!duplicate) {
						membersToAdd.push(ObjectId(proposedMember._id));
					}
				});
				team.members = team.members.concat(membersToAdd);
				team.save(function(err, result) {
					if (err) return res.sendStatus(500);
					else {
						Team.findOne({_id: team._id})
						.populate("teamLead members")
						.exec(function(err, results) {
							if (err) { return res.sendStatus(500);}
							res.send(results);
						});
					}
				});
			}
		});
	},
	removeMember: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) return res.sendStatus(500);
			else {
				team.members.forEach(function(userId) {
					userId = userId.toString();
					if (userId === req.body.userId) {
						team.members.splice(team.members.indexOf(userId), 1);
					}
				});
				team.save(function(err, result) {
					if (err) return res.sendStatus(500);
					else return res.send(result);
				});
			}
		})
	}
}
