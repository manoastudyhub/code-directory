import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Users = new Mongo.Collection('Users');

/** Create a schema to constrain the structure of documents associated with this collection. */
const UserSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  owner: String,
  classStanding: {
    type: String,
    allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    defaultValue: 'Freshman',
  },
  image: String,
  major: String,
  subject1: { type: String, optional: true },
  subject2: { type: String, optional: true },
  subject3: { type: String, optional: true },
  subjects: { type: Object, optional: true },
  description: { type: String, optional: true },
  tutor: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Users.attachSchema(UserSchema);

/** Make the collection and schema available to other code. */
export { Users, UserSchema };
