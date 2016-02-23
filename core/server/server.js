var express = require('express'),
<<<<<<< HEAD
  fallback = require("express-history-api-fallback"),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  chatCtrl = require('./controllers/chatCtrl'),
  config = require('./config');
=======
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	userCtrl = require('./controllers/userCtrl'),
	chatCtrl = require('./controllers/chatCtrl'),
	teamCtrl = require('./controllers/teamCtrl'),
	User = require('./models/userModel'),
	config = require('./config');
>>>>>>> d5df31555aa3d23d4b3ae766953375ae5f3c43ab

passport.use('local', new localStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
	process.nextTick(function() {
		//possibly pull this code out to userCtrl
		User.findOne({'email': email}, function(err, user) {
			if (err) return done(err);
			else if(user) {
				user.validPassword(password)
				.then(function(response) {
					if(response === true) {
						user.loggedIn = true;
						user.save(function(err, result) {
							if (err) return done('Server Error', false);
							else return done(null, result);
						})
					} else {
						return done('Password incorrect', false);
					}
				})
				.catch(function(err) {
					return done('Server Error', false);
				});
			} else {
				return done('User not found', false);
			}
		})
	})
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

function ensuerAuthenticated(req, res, next) {
	if(req.isAuthenticated()) { return next();}
	res.sendStatus(401);
};

var app = express();

var http = require('http').Server(app),
	io = require('socket.io')(http);


app.use(bodyParser.json());
app.use(cors());

<<<<<<< HEAD
app.use(express.static('./public'));
app.use(fallback("index.html", {root: "./public"}));
=======
app.use(express.static(__dirname + '/../../public'));

app.use(session({
	secret: config.sessionSecret,
	saveUninitialized: config.saveUninitialized,
	resave: config.resave
}));

app.use(passport.initialize());
app.use(passport.session());
>>>>>>> d5df31555aa3d23d4b3ae766953375ae5f3c43ab

var mongoUri = config.mongoUri;
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB');
});

//auth endpoints
app.post('/auth/login', passport.authenticate('local', {failureRedirect: '/login' }), userCtrl.getUser);
app.post('/auth/addAccount', userCtrl.create, passport.authenticate('local', {failureRedirect: '/login'}), userCtrl.getUser);
app.get('/auth/logout/:userId', userCtrl.logout);

//user endpoints
app.put('/user/update', userCtrl.updateUserProfile);
app.get('/user/currentUser/:userId', userCtrl.getUser);
app.delete('/user/delete/:userId', userCtrl.deleteUser);
//tested through user

//chat endpoints
app.post('/chat/:teamId', chatCtrl.create);
app.get('/chat/:teamId', chatCtrl.readAllChatsInTeam);
//delete team session chats when last person logs out?
app.delete('/chat/:teamId', chatCtrl.deleteTeamSessionChats)

//team endpoints
app.post('/team/create', teamCtrl.create);
app.delete('/team/delete/:teamId', teamCtrl.deleteTeam);
app.put('/team/updateTeamProfile/:teamId', teamCtrl.updateTeamProfile);
app.get('/team/getTeamInfo/:teamId', teamCtrl.getTeamInfo);
app.put('/team/addMember/:teamId', teamCtrl.addMember);
app.put('/team/removeMember/:teamId', teamCtrl.removeMember);

<<<<<<< HEAD
app.listen(config.port, function() {
  console.log('You are rocking on port: ', config.port);
});
=======
http.listen(config.port, function() {
	console.log('You are rocking on port: ', config.port);
})
>>>>>>> d5df31555aa3d23d4b3ae766953375ae5f3c43ab
