import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Sessions = new Mongo.Collection('Sessions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const SessionSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  date: String,
  location: String,
  owner: String,
  description: String,
  type: {
    type: String,
    allowedValues: ['1 on 1', 'TA', 'group'],
    defaultValue: 'group',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Sessions.attachSchema(SessionSchema);

/** Make the collection and schema available to other code. */
export { Sessions, SessionSchema };