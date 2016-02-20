var mongoose = require('mongoose');

var chatModel = new mongoose.Schema({
	/*userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},*/
	/*teamRef: {type: mongoose.Schema.Types.ObjectId, ref: 'teams'},*/
	userName: {type: 'String'},
	timeStamp: {type: 'Date'},
	message: {type: 'String'}
});

module.exports = mongoose.model('chats', chatModel);