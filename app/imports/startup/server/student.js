import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Students } from '../../api/student/student.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Students.insert(data);
}

/** Initialize the collection if empty. */
if (Students.find().count() === 0) {
  if (Meteor.settings.defaultStudents) {
    console.log('Creating default students.');
    Meteor.settings.defaultStudents.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Students', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.find({ username: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StudentsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Students.find();
  }
  return this.ready();
});
