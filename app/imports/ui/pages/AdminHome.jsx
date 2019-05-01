
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/user/user';
import UserAdmin from '/imports/ui/components/UserAdmin';
import { Sessions } from '/imports/api/session/session';
import StudySessionAdmin from '/imports/ui/components/StudySessionAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Button, Grid, List, Divider, Loader, Modal } from 'semantic-ui-react';

class AdminHome extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className="manoastudyhub-landing-background">
          <br/><Divider/>
          <Container centered>
            <Header as="h2">Study Sessions</Header>
            <List divided verticalAlign='middle'>
              {this.props.sessions.map((session, index) => <List.Item key={index}>
                    <List.Content floated='right'>
                      <Modal size="mini" trigger={<Button>View Session</Button>} closeIcon>
                        <Modal.Content>
                          <StudySessionAdmin session={session} key={index}/>
                        </Modal.Content>
                      </Modal>
                    </List.Content>
                    <List.Content>{`Location: ${session.location}`}</List.Content>
                    <List.Content>{`Date: ${session.date}`}</List.Content>
                  </List.Item>)}
            </List>
            <Header as="h2">All Users</Header>
            <Grid columns={3}>
              {this.props.users.map((user, index) => <Grid.Column key={index} >
                <UserAdmin user={user} key={index}/>
                  </Grid.Column>)}
            </Grid>
          </Container>
        </div>
    );
  }
}


AdminHome.propTypes = {
  users: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('SessionsAdmin');
  const userSubscription = Meteor.subscribe('UsersAdmin');
  return {
    users: Users.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready() && userSubscription(),
  };
})(AdminHome);
