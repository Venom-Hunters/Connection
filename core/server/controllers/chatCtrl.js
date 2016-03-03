var Chat = require("./../models/chatModel");
var q = require("q");

module.exports = {

	create: function(payload) {
		var dfd = q.defer();
		var newChat = new Chat();
		newChat.teamId = payload.teamId;
		newChat.userId = payload._id;
		newChat.message = payload.message;
		newChat.timeStamp = new Date();
		newChat.save(function(err, result) {
						Chat.findById(result._id, function(err, result) {
										if (err) return err;
										dfd.resolve(result);
						}).populate('teamId userId');
		});
		return dfd.promise;
	},
	readAllChatsInTeam: function(req, res, next) {
		Chat
		.find({"teamId": req.params.teamId})
		.populate("userId")
		.sort("-timeStamp")
		.exec(function(err, result) {
			if (err) return res.sendStatus(500);
			else return res.send(result);
		});
	},
	deleteTeamSessionChats: function(req, res, next) {
		Chat.remove({teamId: req.params.teamId}, function(err) {
				if (err) res.sendStatus(500);
				else res.send("chats deleted");
			});
	}
};
