var Team = require('./../models/teamModel');

module.exports = {
	
	create: function(req, res, next) {
		var newTeam = new Team(req.body);
		newTeam.save(function(err, result) {
			if (err) res.sendStatus(500);
			else res.send(result);
		})
	},
	deleteTeam: function(req, res, next) {
		Team.findOneAndRemove({_id: req.params.teamId}, function(err, result) {
			if (err) res.sendStatus(500);
			else res.send(result);
		})
	},
	updateTeamProfile: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) res.sendStatus(500);
			else {
				team.teamName = req.body.teamName;
				team.save(function(err, result) {
					if (err) res.sendStatus(500);
					else res.send(result);	
				})
			}
		})
	},
	getTeamInfo: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) res.sendStatus(500);
			else res.send(result);
		})
	},
	addMember: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) res.sendStatus(500);
			else {
				team.members.push(req.body.userId);
				team.save(function(err, result) {
					if (err) res.sendStatus(500);
					else res.send(result);	
				})
			}
		})
	},
	removeMember: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) res.sendStatus(500);
			else {
				team.members.forEach(function(userId) {
					if (userId === req.body.userId) {
						team.members.splice(team.members.indexOf(userId), 1);
						team.save(function(err, result) {
							if (err) res.sendStatus(500);
							else res.send(result);	
						})
					} else {
						res.sendStatus(404);
					}
				})
			}
		})
	}
}