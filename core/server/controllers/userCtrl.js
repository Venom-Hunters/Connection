var User = require("./../models/userModel");
var Team = require("./../models/teamModel");

module.exports = {
	create: function(req, res, next) {
	    User.findOne({"email": req.body.email}, function(err, user) {
	        if (user) {
	            return res.status(403).send("Email already exists. Please use a different email.");
	        } else {
			    var newUser = new User();
			    newUser.userName = req.body.userName;
			    newUser.email = req.body.email;
			    newUser.generateHash(req.body.password).then(function(response) {
			        newUser.password = response;
			        newUser.save(function(err, result) {
			            if (err) {
			                return res.status(500).send();
			            } else {
			            	return next();
			            }
			        });
			    });
			}
		});
	},
	updateUserProfile: function(req, res, next) {
		User.findById(req.user._id, function(err, user) {
			if (err) return res.status(500).send(err);
			else {
				user.userName = req.body.userName;
				user.generateHash(req.body.password).then(function(response) {
					user.password = response;
					user.save(function(err, result) {
						if (err) return res.status(500).send(err);
						else return res.send(user);
					});
				});
			}
		});
	},
	deleteUser: function(req, res, next) {
		User.findOneAndRemove({_id: req.params.userId}, function(err, result) {
			if(err) return res.status(500).send(err);
			else return res.send(result);
		});
	},
	getUser: function(req, res, next) {
		if (req.isAuthenticated()) {
			User.findById(req.user._id).populate("lastTeamViewed").exec(function(err, user) {
				if (err) res.status(500).send(err);
				else if (!user) {
					return res.status(401).send();
				}
				else {
					return res.send(user);
				}
			});
		} else res.status(401).send();
	},
	search: function(req, res, next) {
		if (!req.body.searchTerm) {
			return res.send([]);
		}
		User.find({$or:[{'userName': {'$regex': req.body.searchTerm, '$options': 'i'}}, {'email': {'$regex': req.body.searchTerm, '$options': 'i'}}]}, function(err, result) {
			if (err) res.sendStatus(500);
			else if (!result.length) {
				res.sendStatus(404);
			}
			else {
			res.send(result);
		}
		});
	},
	logout: function(req, res, next) {
		User.findById(req.user._id, function(err, user) {
			if(err) return res.sendStatus(500);
			else {
				user.loggedIn = false;
				user.save(function(err, result) {
					if (err) return res.sendStatus(500);
					else {
						req.session.destroy();
						req.logout();
						return res.send(result);
					}
				});
			}
		});
	}
};
