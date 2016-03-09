var mongoose = require("mongoose"),
	bcrypt = require("bcrypt-nodejs"),
	q = require("q");

var teamSchema = mongoose.Schema({
	teamName: {type: "String"},
	lowerCaseTeamName: {type: "String"},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
	teamLead: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
	regToken: {type: "String"},
	creationDate: {type: "Date"},
	sessionId: {type: mongoose.Schema.Types.ObjectId, ref: "chatSessions"}
});

teamSchema.methods.generateHash = function (regToken) {
	var dfd = q.defer();
	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			dfd.reject(err);
		}
		bcrypt.hash(regToken, salt, null, function (err, hash) {
			regToken = hash;
			dfd.resolve(regToken);
		});
	});
	return dfd.promise;
};

teamSchema.methods.validToken = function (regToken) {
	var dfd = q.defer();

	bcrypt.compare(regToken, this.regToken, function (err, isMatch) {
		if (err) {
			dfd.reject(err);
		}
		else {
			dfd.resolve(isMatch);
		}
	});
	return dfd.promise;
};

module.exports = mongoose.model("teams", teamSchema);