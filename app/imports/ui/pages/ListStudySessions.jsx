import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StudySession from '/imports/ui/components/StudySession';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudySessions extends React.Component {

  sessions = [{
    firstName: 'Bailey', lastName: 'Namahoe', createdBy: 'John Doe', date: '4/5/19',
    location: 'Hamilton Library Study Room 301', owner: 'Bailey Namahoe',
    description: 'A study group for those in the Biol 375.', course: 'BIOL', type: 'group',
  },
    {
      firstName: 'Tyler', lastName: 'Chinen', createdBy: 'John Doe', date: '4/9/19', location: 'Campus Center',
      owner: 'Tyler Chinen', description: 'A study group for those in the Biol 340 class to study for the final.',
      course: 'BIOL', type: 'group',
    },
    {
      firstName: 'John', lastName: 'Smith', createdBy: 'John Doe', date: '4/17/19', location: 'Paradise Palms',
      owner: 'John Smith', description: 'A study session request for someone who can help with writing an essay for ' +
          'Linguistics 102.',
      course: 'LING', type: '1 on 1',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Study Sessions</Header>
          <Card.Group>
            {this.sessions.map((session, index) => <StudySession key={index} session={session} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudySessions);
