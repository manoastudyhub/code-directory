import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Tutors } from '../../api/tutor/tutor.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Tutors.insert(data);
}

/** Initialize the collection if empty. */
if (Tutors.find().count() === 0) {
  if (Meteor.settings.defaultTutors) {
    console.log('Creating default Tutors.');
    Meteor.settings.defaultTutors.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Tutors', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Tutors.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('TutorsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Tutors.find();
  }
  return this.ready();
});
