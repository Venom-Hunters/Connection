var Team = require("./../models/teamModel");

module.exports = {

	create: function(req, res, next) {
		var newTeam = new Team();
		newTeam.teamName = req.body.teamName;
		newTeam.members = [req.user._id];
		newTeam.teamLead = req.user._id;
		newTeam.creationDate = new Date();
		/*newTeam.regToken = req.body.regToken;*/
		newTeam.save(function(err, result) {
		if (err) { return res.sendStatus(500); }
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

	},

	getTeams: function(req, res, next) {
		if (req.user) {
		Team.find({$or: [{'members': req.user._id}, {'teamLead': req.user._id}]}, function(err, teams) {
			if (err) res.sendStatus(500);
			else if (!teams) res.sendStatus(404);
			else res.send(teams);
		}).populate('members teamLead');
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
	addMember: function(req, res, next) {
		Team.findById(req.params.teamId, function(err, team) {
			if (err) return res.sendStatus(500);
			else {
				for (var i = 0; i < team.members.length; i++) {
					team.members[i] = team.members[i].toString();
					if (team.members[i] === req.body.userId) {
						return res.status(403).send("Member already in team.");
					}
				}
				team.members.push(req.body.userId);
				team.save(function(err, result) {
					if (err) return res.sendStatus(500);
					else return res.send(result);
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
