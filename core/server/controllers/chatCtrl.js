var Chat = require("./../models/chatModel");
var ChatSession = require('./../models/chatSessionModel');
var q = require("q");

module.exports = {

	create: function(payload) {
		var dfd = q.defer();
		var newChat = new Chat();
		newChat.teamId = payload.teamId;
		newChat.userId = payload._id;
		newChat.sessionId = payload.teamId.sessionId;
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
				ChatSession
				.findById(newChatSession._id)
				.populate('teamId')
				.exec(function(err, result) {
					if (err) return false;
					else dfd.resolve(result);
				})
			}
		});
		return dfd.promise;
	},
	endChatSession: function(sessionId) {
		var dfd = q.defer();
		ChatSession.findById(sessionId, function(err, session) {
			if (err) return err;
			else {
				session.timeEnd = new Date();
				session.save(function(err, result) {
					if (err) return result;
					else {
						ChatSession
						.findById(session._id)
						.populate('teamId')
						.exec(function(err, result) {
							if (err) return err;
							else dfd.resolve(result);
						})
						
					} 

				})
			}
		})
		return dfd.promise;
	},
	retrieveTeamChatSessions: function(req, res, next) {
		ChatSession
			.find({'teamId': req.params.teamId})
			.populate('teamId')
			.exec(function(err, result) {
				if (err) return res.sendStatus(500);
				else res.send(result);
		});
	},
	getSessionChats: function(req, res, next) {
		Chat
			.find({sessionId: req.params.sessionId})
			.populate('userId')
			.exec(function(err, chats) {
				if (err) return res.sendStatus(500);
				else {
					return res.send(chats);
				}
		});
	},
	deleteNullSessionTeamChats: function(teamId) {
		var dfd = q.defer();
		Chat.find({teamId: teamId}, function(err, chats) {
			if (err) dfd.resolve(err);
			else {
				chats.forEach(function(chat) {
					if (!chat.sessionId) {
						Chat.remove({_id: chat._id}, function(err, result) {
							if (err) return dfd.resolve(err);
						});
					}
				})
				return dfd.resolve('null chats deleted');
			}
		})
		return dfd.promise;
	}
};
