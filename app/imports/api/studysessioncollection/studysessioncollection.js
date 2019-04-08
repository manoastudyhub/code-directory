import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const StudySessions = new Mongo.Collection('StudySessions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StudySchema = new SimpleSchema({
  name: String,
  date: Date,
  owner: String,
  Description: String,
  class: String,
  location: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudySessions.attachSchema(StudySchema);

/** Make the collection and schema available to other code. */
export { StudySessions, StudySchema };
