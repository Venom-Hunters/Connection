var express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  session = require("express-session"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  path = require("path");

var MongoStore = require("connect-mongo")(session);

var	chatCtrl = require("./controllers/chatCtrl"),
    userCtrl = require("./controllers/userCtrl"),
	teamCtrl = require("./controllers/teamCtrl"),
	User = require("./models/userModel"),
	config = require("./config");

passport.use("local", new localStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
}, function(req, email, password, done) {
	process.nextTick(function() {
		//possibly pull this code out to userCtrl
		User.findOne({"email": email}, function(err, user) {
			if (err) return done(err);
			else if(user) {
				user.validPassword(password)
				.then(function(response) {
					if(response === true) {
						user.loggedIn = true;
						user.save(function(err, result) {
							if (err) return done("Server Error", false);
							else return done(null, result);
						});
					} else {
						return done("Password incorrect", false);
					}
				})
				.catch(function(err) {
					return done("Server Error", false);
				});
			} else {
				return done("User not found", false);
			}
		});
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) { return next();}
	res.sendStatus(401);
}

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

io.use(function(socket, next) {
	sessionMiddleware(socket.request, {}, next);
});

io.on("connection", function(socket) {
	console.log('user connected');
  	var socketsArray = Object.keys(io.sockets.connected).map(function(item) {

  		if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
  			return io.sockets.connected[item].request.session.passport.user._id;
  		}
  	});

	socket.emit('ONLINE_USERS', socketsArray);

	socket.on('JOIN_ROOMS', function(teamsToJoin) {
    	teamsToJoin.forEach(function(team) {
      		socket.join(team._id);
    	});
	});
	socket.on('LEAVE_ROOMS', function(teamsToLeave) {
		teamsToLeave.forEach(function(team) {
			socket.leave(team._id);
		})
	})

  	socket.on('I_CAME_ONLINE', function(user) {
  		socket.request.session = {passport:{user:{_id:user}}};
  	  	var socketsArray = Object.keys(io.sockets.connected).map(function(item) {

  	  		if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
  	  			return io.sockets.connected[item].request.session.passport.user._id;
  	  		}
  	  	});

  		io.emit('ONLINE_USERS', socketsArray);

  		/*teamCtrl.getTeamsForSocket(user).then(function(userTeams) {
  			var newSocketsArray = Object.keys(io.sockets.connected).map(function(item) {
  				if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
  					return {
  						sessionId: io.sockets.connected[item].request.session.passport.user._id, 
  						socketId: io.sockets.connected[item].id
  					}
  				}
  			});

  			userTeams.map(function(team) {
  				var inSessionCounter = 0;
  				newSocketsArray.map(function(socketUser) {
  					if (team.members.indexOf(socketUser.sessionId) !== -1) {
  						inSessionCounter++;
  					}
  				})
  				if (inSessionCounter === 1) {
  					chatCtrl.createChatSession(team._id).then(function(teamChatSessions) {
  					});
  				} else {
					chatCtrl.retrieveTeamChatSessions(team._id).then(function(teamChatSessions) {
					});
  				}
  			})
  		});*/
	});

	socket.on('I_LOGGED_OFF', function(user) {
		var socketsArray = Object.keys(io.sockets.connected).map(function(item) {
			if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
				return {
					sessionId: io.sockets.connected[item].request.session.passport.user._id, 
					socketId: io.sockets.connected[item].id
				}
			}
		});

		socketsArray.map(function(socketUser) {
			if (socketUser.sessionId === user) {
				io.sockets.connected[socketUser.socketId].disconnect();
			}
		})
		teamCtrl.getTeamsForSocket(user).then(function(userTeams) {
			var newSocketsArray = Object.keys(io.sockets.connected).map(function(item) {
				if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
					return {
						sessionId: io.sockets.connected[item].request.session.passport.user._id, 
						socketId: io.sockets.connected[item].id
					}
				}
			});

			for (var i = newSocketsArray.length - 1; i >= 0 ; i--) {
				if (!newSocketsArray[i].sessionId) {
					newSocketsArray.splice(i, 1);
				}
			}
			userTeams.map(function(team) {
				var inSession = false;
				newSocketsArray.map(function(socketUser) {
					if (team.members.indexOf(socketUser.sessionId) !== -1) {
						inSession = true;
					}
				})
				if (inSession === true) {

				} else {

					/*chatCtrl.createChatSession(team._id).then(function(response) {
						console.log('chat session created', response);
					}) *********DO NOT DELETE THIS!!********* */
				}
			})
		});

	})

  socket.on("SEND_MESSAGE", function(payload) {
  	chatCtrl.create(payload).then(function(result) {
  		socket.server.to(payload.teamId._id).emit("RECEIVE_MESSAGE", result);
  	});
  });

  socket.on('UPDATE_MEMBERS', function(memberIdArray) {
  	console.log()
  	var socketsArray = Object.keys(io.sockets.connected).map(function(item) {
  		if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
  			return {
  				sessionId: io.sockets.connected[item].request.session.passport.user._id, 
  				socketId: io.sockets.connected[item].id
  			}
  		}
  	});
  	socketsArray.map(function(connectedUser) {
  		if (memberIdArray.indexOf(connectedUser.sessionId) !== -1) {
  			io.sockets.connected[connectedUser.socketId].emit('UPDATE_TEAMS');
  		}
  	})
  })

  socket.on('disconnect', function() {
	console.log('user disconnect');
  	var socketsArray = Object.keys(io.sockets.connected).map(function(item) {

  		if (io.sockets.connected[item].request.session.passport && io.sockets.connected[item].request.session.passport.user) {
  			return io.sockets.connected[item].request.session.passport.user._id;
  		}
  	});

	io.emit('ONLINE_USERS', socketsArray);
  });

});

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.resolve("public/")));

var mongoUri = config.mongoUri;

mongoose.connect(mongoUri);
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB");
});


var sessionMiddleware = session({
	secret: config.secret,
	saveUninitialized: config.saveUninitialized,
	resave: config.resave,
  	store: new MongoStore({ mongooseConnection: mongoose.connection })
});

app.use(sessionMiddleware);


app.use(passport.initialize());
app.use(passport.session());

//auth endpoints
app.post("/auth/login", passport.authenticate("local", {failureRedirect: "/login" }), userCtrl.getUser);
app.post("/auth/addAccount", userCtrl.create, passport.authenticate("local", {failureRedirect: "/login"}), userCtrl.getUser);
app.get("/auth/logout", userCtrl.logout);

//user endpoints
app.put("/user/update", userCtrl.updateUserProfile);
app.get("/user/getUser", userCtrl.getUser);
app.post('/user/search', userCtrl.search);
app.put("/user/updateActiveTeam", userCtrl.updateActiveTeam);

app.delete("/user/delete/:userId", userCtrl.deleteUser);
//tested through user

//chat endpoints
app.post("/chat/:teamId", chatCtrl.create);
app.get("/chat/:teamId", chatCtrl.readAllChatsInTeam);
//delete team session chats when last person logs out?
app.delete("/chat/:teamId", chatCtrl.deleteTeamSessionChats);

//team endpoints
app.post("/team/create", teamCtrl.create);
app.get("/team/getTeams", teamCtrl.getTeams);
app.delete("/team/delete/:teamId", teamCtrl.deleteTeam);
app.put("/team/updateTeamProfile/:teamId", teamCtrl.updateTeamProfile, teamCtrl.getTeamInfo);
app.get("/team/getTeamInfo/:teamId", teamCtrl.getTeamInfo);
app.post("/team/addMembers/:teamId", teamCtrl.addMembers);
app.put("/team/removeMember/:teamId", teamCtrl.removeMember);

app.get(/^(?!.*(images))/, function (req, res) {
 res.sendFile(path.resolve("public/index.html"));
});

server.listen(config.port, function() {
  console.log("port", config.port + "!");
});
