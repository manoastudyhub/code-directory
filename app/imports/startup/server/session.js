import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Sessions } from '../../api/session/session.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Sessions.insert(data);
}

/** Initialize the collection if empty. */
if (Sessions.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default Sessions.');
    Meteor.settings.defaultSessions.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Sessions', function publish() {
  if (this.userId) {
    return Sessions.find();
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('SessionsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Sessions.find();
  }
  return this.ready();
});