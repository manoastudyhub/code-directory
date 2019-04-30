import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. TO be used w attend button */
const Attends = new Mongo.Collection('Attends');

/** Create a schema to constrain the structure of documents associated with this collection. */
const AttendSchema = new SimpleSchema({
  userId: String,
  sessionId: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Attends.attachSchema(AttendSchema);

/** Make the collection and schema available to other code. */
export { Attends, AttendSchema };
