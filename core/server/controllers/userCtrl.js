var User = require('./../models/userModel');

module.exports = {
	create: function(req, res, next) {
	    User.findOne({'email': req.body.email}, function(err, user) {
	        if (user) {
	            res.status(403).send('Email already exists. Please use a different email.');
	        } else {
			    var newUser = new User();
			    newUser.userName = req.body.userName;
			    newUser.email = req.body.email;
			    newUser.generateHash(req.body.password).then(function(response) {
			        newUser.password = response;
			        newUser.save(function(err, result) {
			            if (err) {
			                res.status(500).send();
			            } else {
			            	next();
			            }
			        })
			    });
			}
	    })
	},
	updateUserProfile: function(req, res, next) {
		User.findById(req.user._id, function(err, user) {
			if (err) res.status(500).send(err);
			else {
				user.userName = req.body.userName;
				user.generateHash(req.body.password).then(function(response) {
					user.password = response;
					user.save(function(err, result) {
						if (err) res.status(500).send(err);
						else res.send(user); 
					})
				})
			}
		})
	},
	deleteUser: function(req, res, next) {
		User.findOneAndRemove({_id: req.params.userId}, function(err, result) {
			if(err) res.status(500).send(err);
			else res.send(result);
		})
	},	
	getUser: function(req, res, next) {
		if (req.isAuthenticated()) {
			User.findById(req.user._id).populate('lastTeamViewed').exec(function(err, user) {
				if (err) res.status(500).send(err);
				else if (!user) {
					req.status(401).send();
				}
				else {
					res.send(user);
				}
			});
		} else res.status(401).send();
	},
	logout: function(req, res, next) {
		User.findById(req.params.userId, function(err, user) {
			if(err) res.sendStatus(500);
			else {
				user.loggedIn = false;
				user.save(function(err, result) {
					if (err) res.sendStatus(500);
					else {
						req.session.destroy();
						req.logout();
						res.send(result);
					}
				})
			}
		})
	}

}