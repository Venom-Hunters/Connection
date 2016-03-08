var mongoose = require('mongoose');

var chatSessionModel = new mongoose.Schema( {
	teamId: {type: mongoose.Schema.Types.ObjectId, ref: "teams"},
	timeStart: {type: "Date"},
	chatQty: {type: 'Number'}
})

module.exports = mongoose.model('chatSessions', chatSessionModel);