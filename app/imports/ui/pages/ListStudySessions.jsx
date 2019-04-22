import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Sessions } from '/imports/api/session/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StudySession from '/imports/ui/components/StudySession';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudySessions extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="manoastudyhub-landing-background">
        <Container>
          <Header as="h2" textAlign="center">List Study Sessions</Header>
          <Card.Group>
            {this.props.sessions.map((session, index) => <StudySession key={index} session={session} />)}
          </Card.Group>
        </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudySessions);
