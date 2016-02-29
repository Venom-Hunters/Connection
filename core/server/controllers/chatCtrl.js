var Chat = require("./../models/chatModel");

module.exports = {

	create: function(req, res, next) {
		var newChat = new Chat();
		newChat.teamId = req.params.teamId;
		newChat.userId = req.body.userId;
		newChat.message = req.body.message;
		newChat.timeStamp = new Date();
		newChat.save(function(err, result){
			if (err) res.sendStatus(500);
			else res.send(result);
		});
	},
	readAllChatsInTeam: function(req, res, next) {
		Chat
		.find({teamId: req.params.teamId}).populate("userId")
		.exec(function(err, result) {
			if (err) res.sendStatus(500);
			else res.send(result);
		});
	},
	deleteTeamSessionChats: function(req, res, next) {
		Chat.remove({teamId: req.params.teamId}, function(err) {
				if (err) res.sendStatus(500);
				else res.send("chats deleted");
			});
	}
}
