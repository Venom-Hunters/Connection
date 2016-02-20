var mongoose = require('mongoose');

var chatModel = new mongoose.Schema({
	userName: {type: 'String'},
	timeStamp: {type: 'Date'},
	message: {type: 'String'}
});

module.exports = mongoose.model('demoChats', chatModel);