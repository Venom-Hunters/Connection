var Chat = require("./../models/chatModel");
var ChatSession = require('./../models/chatSessionModel');
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
		/*ChatSession
		.find({'teamId': req.params.teamId})
		.sort('-timeEnd')
		.exec(function(err, chatSessions) {
			console.log('chatSessions', chatSessions);
		})*/
		Chat
		.find({"teamId": req.params.teamId})
		.populate("userId")
		.sort("-timeStamp")
		.exec(function(err, result) {
			if (err) return res.sendStatus(500);
			else return res.send(result);
		});
	},
	createChatSession: function(teamId) {
		var dfd = q.defer();
		var newChatSession = new ChatSession();
		newChatSession.teamId = teamId;
		newChatSession.timeStart = new Date();
		newChatSession.save(function(err, newChatSession) {
			if (err) return false;
			else {
				ChatSession.find({'teamId': teamId}, function(err, result) {
					if (err) return false;
					else dfd.resolve(result);
				})
			}
		});
		return dfd.promise;
	},
	endChatSession: function(teamId) {
		var dfd = q.defer();
		var newChatSession = new ChatSession();
		newChatSession.teamId = teamId;
		newChatSession.timeEnd = new Date();
		newChatSession.save(function(err, newChatSession) {
			if (err) return false;
			else return dfd.resolve(newChatSession);
		});
		return dfd.promise;
	},
	retrieveTeamChatSessions: function(teamId) {
		var dfd = q.defer();
		ChatSession.find({'teamId': teamId}, function(err, result) {
			if (err) return false;
			else dfd.resolve(result);
		});
		return dfd.promise;
	},
	deleteTeamSessionChats: function(req, res, next) {
		Chat.remove({teamId: req.params.teamId}, function(err) {
				if (err) res.sendStatus(500);
				else res.send("chats deleted");
			});
	}
};
