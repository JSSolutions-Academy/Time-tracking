import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    return this.ready();
  }
});
