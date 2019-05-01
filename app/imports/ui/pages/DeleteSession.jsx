import React from 'react';
import { Grid, Loader, Header, Segment, Container } from 'semantic-ui-react';
import { Stuffs, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class DeleteSession extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    Sessions.collection.remove(_id, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Delete succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.submit(this.props.doc) : <Loader active>Getting data</Loader>;
  }
}

DeleteSession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  docID: PropTypes.String,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Session documents.
  const subscription = Meteor.subscribe('SessionsAdmin');
  return {
    doc: Sessions.findOne(documentId),
    docID: documentId,
    ready: subscription.ready(),
  };
})(DeleteSession);
