import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/user/user';
import User from '/imports/ui/components/User';
import { Sessions } from '/imports/api/session/session';
import StudySession from '/imports/ui/components/StudySession';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { NavLink } from 'react-router-dom';
import { Container, Header, Icon, Button, Grid, List, Divider, Item, Loader, Modal } from 'semantic-ui-react';

function subjectMatch(arr1, arr2) {
  return arr2.some(function (v) {
    return arr1.indexOf(v) >= 0;
  });
}
function returnCurrentUser(userArray, user) {
  return (userArray.find(x => x.owner === user));
}
class UserHome extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    return (
        <div className="manoastudyhub-landing-background">
          <Grid centered columns={3}>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/profile'>
                <Icon name="user" size="huge"/>
                <Header as="h2">My Profile</Header>
              </Item>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/calendar'>
                <Icon name="calendar alternate" size="huge"/>
                <Header as="h2">My Calendar</Header>
              </Item>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/studyList'>
                <Icon name="user" size="huge"/>
                <Header as="h2">My Study Sessions</Header>
              </Item>
            </Grid.Column>
          </Grid>
          <br/><Divider/>
          <Container>
            <Header as="h2">Your Study Sessions</Header>
            <List divided verticalAlign='middle'>
              {this.props.sessions.map((session, index) => ((session.attending.indexOf(this.props.currentUser) > -1) ? (
                      <List.Item key={index}>
                        <List.Content floated='right'>
                          <Modal size="mini" trigger={<Button>View Session</Button>} closeIcon>
                            <Modal.Content>
                              <StudySession session={session} key={index}/>
                            </Modal.Content>
                          </Modal>
                        </List.Content>
                        <List.Content>{`Course: ${session.course}`}</List.Content>
                        <List.Content>{`Location: ${session.location}`}</List.Content>
                        <List.Content>{`Date: ${session.date}`}</List.Content>
                      </List.Item>) : ('')))
              }
            </List>
            <Header as="h2">Study Sessions With Your Major or Subjects</Header>
            <List divided verticalAlign='middle'>
              {this.props.sessions.map((session, index) => (((session.course === (
                  returnCurrentUser(this.props.users, this.props.currentUser)).major) ||
                      ((subjectMatch(session.course, (returnCurrentUser(this.props.users,
                          this.props.currentUser)).subjects)))) ? (
                      <List.Item key={index}>
                        <List.Content floated='right'>
                          <Modal size="mini" trigger={<Button>View Session</Button>} closeIcon>
                            <Modal.Content>
                              <StudySession session={session} key={index}/>
                            </Modal.Content>
                          </Modal>
                        </List.Content>
                        <List.Content>{`Course: ${session.course}`}</List.Content>
                        <List.Content>{`Location: ${session.location}`}</List.Content>
                        <List.Content>{`Date: ${session.date}`}</List.Content>
                      </List.Item>) : ('')))
              }
            </List>
            <Header as="h2">Other Students With The Same Major</Header>
            <Grid columns={3}>
              {this.props.users.map((user, index) => (((user.owner !== this.props.currentUser) && (
                  (returnCurrentUser(this.props.users, this.props.currentUser)).major === user.major)) ? (
                        <Grid.Column key={index}>
                          <User user={user} key={index}/>
                        </Grid.Column>
                    ) : ('')))
              }
            </Grid>
            <Header as="h2">Other Students Taking Similar Subjects</Header>
            <Grid columns={3}>
              {this.props.users.map((user, index) => (((user.owner !== this.props.currentUser) &&
                  (subjectMatch((returnCurrentUser(this.props.users, this.props.currentUser)).subjects,
                      user.subjects))) ? (
                      <Grid.Column key={index}>
                        <User user={user} key={index} />
                      </Grid.Column>
                  ) : ('')))
              }
            </Grid>
          </Container>
        </div>
    );
  }
}

UserHome.propTypes = {
  users: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  const useSubscription = Meteor.subscribe('AllUsers');
  return {
    users: Users.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready() && useSubscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(UserHome);
