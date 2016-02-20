var Chat = require('./../models/chatModel');

module.exports = {

	create: function(req, res, next) {
		var newChat = new Chat(req.body);
		newChat.save(function(err, result){
			if (err) res.sendStatus(500);
			else res.send(result);
		});
	},
	readAllChatsInTeam: function(req, res, next) {
		Chat
		.find({teamRef: req.params.teamId})
		.sort('-timeStamp')
		.exec(function(err, result) {
			if (err) res.sendStatus(500);
			else res.send(result);
		});
	},
	deleteTeamSessionChats: function(req, res, next) {
		Chat.remove(
			{teamRef: req.params.teamId},
			function(err) {
				if (err) res.sendStatus(500);
			});
	}
}
