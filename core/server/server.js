var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	chatCtrl = require('./controllers/chatCtrl'),
	config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('./public'));

var mongoUri = config.mongoUri;
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
	console.log('Connected to MongoDB');
});

//chat endpoints
app.post('/chat', chatCtrl.create);
app.get('/chat', chatCtrl.readAllChatsInTeam);
app.delete('/chat', chatCtrl.deleteTeamSessionChats);

app.listen(config.port, function() {
	console.log('You are rocking on port: ', config.port);
});
