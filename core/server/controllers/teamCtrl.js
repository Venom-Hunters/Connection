var Team = require("./../models/teamModel");
var User = require("./../models/userModel");
var q = require("q");

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

module.exports = {

	create: function(req, res, next) {
		if (req.user && req.user._id)
		{


		var newTeam = new Team();
		newTeam.teamName = req.body.teamName;
		newTeam.lowerCaseTeamName = req.body.teamName.toLowerCase();
		newTeam.members = [req.user._id];
		newTeam.teamLead = req.user._id;
		newTeam.creationDate = new Date();
		newTeam.save(function(err, result) {
		if (err) { return res.sendStatus(500); }
			Team
			.findOne({_id: result._id}, function(err, result) {
				if(err) { res.sendStatus(500); }
					var active = result;
					Team.find({
						members: req.user._id
					})
					.sort('-teamName')
					.populate('members teamLead')
					.exec(function(err, results) {
						return res.send({
							active: active,
							all: results
						});
					});
			})
			.populate('members teamLead');
		});
		} else {
			res.sendStatus(500);
		}
	},

	getTeams: function(req, res, next) {
		if (req.user) {
			Team
			.find({$or: [{'members': req.user._id}, {'teamLead': req.user._id}]})
			.populate('members teamLead')
			.exec(function(err, teams) {
				if (err) res.sendStatus(500);
				else if (!teams) return res.sendStatus(404);
				else {
					if (teams.length === 0) {
						User.findById(req.user._id, function(err, user) {
							if (err) return res.sendStatus(500);
							else {
								user.lastTeamViewed = null;
								user.save();
								return res.send(teams);
							}
						});
					} else {
						return res.send(teams);
					}
				}
			});
		} else {
			res.sendStatus(500);
		}
	},

	getTeamsForSocket: function(userId) {
		var dfd = q.defer();
		Team
		.find({$or: [{'members': userId}, {'teamLead': userId}]})
		.exec(function(err, teams) {
			if (err) return dfd.resolve(err);
			else if (!teams) return dfd.resolve([]);
			else dfd.resolve(teams);
		});
		return dfd.promise;
	},

	deleteTeam: function(req, res, next) {
		Team.findOneAndRemove({_id: req.params.teamId}, function(err, deleteResult) {
			if (err) return res.sendStatus(500);
			else if (!deleteResult) return res.sendStatus(404);
			else {
				Team
				.find({'members': req.user._id})
				.populate('members teamLead')
				.exec(function(err, teamFindResult) {
					if (err) return res.sendStatus(404);
					else if (teamFindResult.length === 0) {
						return res.send(null);
					}
					else {
						User.findById(req.user._id, function(err, user) {
							if (err) return res.sendStatus(500);
							else {
								user.lastTeamViewed = teamFindResult[0]._id;
								user.save();
								return res.send(teamFindResult[0]);
							}
						})
					} 						
				})	
			}
		});
	},

	updateTeamProfile: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) return res.sendStatus(500);
			else {
				team.teamName = req.body.teamName;
				team.lowerCaseTeamName = req.body.teamName.toLowerCase();
				team.save(function(err, result) {
					if (err) return res.sendStatus(500);
					else return next();
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
				team.members = req.body;
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
