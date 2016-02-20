var Chat = require('./../models/chatModel');

module.exports = {

	create: function(req, res, next) {
		var newChat = new Chat();
		newChat.userName = req.body.userName;
		newChat.message = req.body.message;
		newChat.timeStamp = new Date();
		newChat.save(function(err, result){
			if (err) res.sendStatus(500);
			else res.send(result);
		});
	},
	readAllChatsInTeam: function(req, res, next) {
		Chat
		.find({})
		.sort('-timeStamp')
		.exec(function(err, result) {
			if (err) res.sendStatus(500);
			else res.send(result);
		});
	},
	deleteTeamSessionChats: function(req, res, next) {
		Chat.remove({}, function(err) {
				if (err) res.sendStatus(500);
				else res.send('chats deleted');
			});
	}
}
