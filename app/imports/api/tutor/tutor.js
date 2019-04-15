import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Tutors = new Mongo.Collection('Tutors');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TutorSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  classStanding: String,
  image: String,
  major: String,
  subjects: String,
  description: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Tutors.attachSchema(TutorSchema);

/** Make the collection and schema available to other code. */
export { Tutors, TutorSchema };
