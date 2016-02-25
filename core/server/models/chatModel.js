var mongoose = require("mongoose");

var chatModel = new mongoose.Schema({
	teamId: {type: mongoose.Schema.Types.ObjectId, ref: "teams"},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
	timeStamp: {type: "Date"},
	message: {type: "String"}
});

module.exports = mongoose.model("chats", chatModel);