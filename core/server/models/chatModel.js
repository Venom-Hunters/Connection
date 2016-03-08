var mongoose = require("mongoose");

var chatModel = new mongoose.Schema({
	teamId: {type: mongoose.Schema.Types.ObjectId, ref: "teams"},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
	sessionId: {type: mongoose.Schema.Types.ObjectId, ref: "chatSessions"},
	timeStamp: {type: "Date"},
	message: {type: "String"}
});

module.exports = mongoose.model("chats", chatModel);