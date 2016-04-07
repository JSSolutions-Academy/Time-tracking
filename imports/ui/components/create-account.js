import { Accounts } from 'meteor/accounts-base';

Accounts.createUser = function(options, callback) {
	options = _.clone(options); // we'll be modifying options

	if (typeof options.password !== 'string')
	    throw new Error("options.password must be a string");
	if (!options.password) {
	    callback(new Meteor.Error(400, "Password may not be empty"));
	    return;
	}

	// Replace password with the hashed password.
	options.password = Accounts._hashPassword(options.password);
	options.profile.url = '';

	Accounts.callLoginMethod({
	  methodName: 'createUser',
	  methodArguments: [options],
	  userCallback: callback
	});

};