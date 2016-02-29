var express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
	cors = require("cors"),
	session = require("express-session"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
  path = require("path");

var MongoStore = require('connect-mongo')(session);

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

io.on("connection", function(socket) {
    var activeTeam;
	socket.on('JOIN_ROOM', function(joinTeam) {
		activeTeam = joinTeam.toString();
		socket.join(activeTeam);
	})
	socket.on('LEAVE_ROOM', function(leaveTeam) {
		socket.leave(leaveTeam);
	})

  socket.on('SEND_MESSAGE', function(payload) {
  	console.log('messageObj', payload);
    socket.server.to(activeTeam).emit('RECEIVE_MESSAGE', payload.message);
  });
});

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./public"));

var mongoUri = config.mongoUri;

mongoose.connect(mongoUri);
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB");
});

app.use(session({
	secret: config.secret,
	saveUninitialized: config.saveUninitialized,
	resave: config.resave,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

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

app.delete("/user/delete/:userId", userCtrl.deleteUser);
//tested through user

//chat endpoints
app.post("/chat/:teamId", chatCtrl.create);
app.get("/chat/:teamId", chatCtrl.readAllChatsInTeam);
//delete team session chats when last person logs out?
app.delete("/chat/:teamId", chatCtrl.deleteTeamSessionChats);

//team endpoints

app.post('/team/create', teamCtrl.create);
app.get("/team/getTeams", teamCtrl.getTeams);
app.delete('/team/delete/:teamId', teamCtrl.deleteTeam);
app.put('/team/updateTeamProfile/:teamId', teamCtrl.updateTeamProfile);
app.get('/team/getTeamInfo/:teamId', teamCtrl.getTeamInfo);
app.post('/team/addMembers/:teamId', teamCtrl.addMembers);
app.put('/team/removeMember/:teamId', teamCtrl.removeMember);


app.get(/^(?!.*(images))/, function (req, res) {
 res.sendFile(path.resolve("./public/index.html"));
});

server.listen(config.port, function() {
  console.log("About to murder Rey on port", config.port + "!");
});
