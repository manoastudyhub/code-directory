import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/user/user';
import User from '/imports/ui/components/User';
import { Tutors } from '/imports/api/tutor/tutor';
import Tutor from '/imports/ui/components/Tutor';
import { Sessions } from '/imports/api/session/session';
import StudySession from '/imports/ui/components/StudySession';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { withRouter, NavLink } from 'react-router-dom';
import { Container, Header, Menu, Image, Icon, Button, Grid, List, Divider, Item, Loader, Modal } from 'semantic-ui-react';

class AdminHome extends React.Component {
  
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  renderPage() {
    return (
      <div>
          <Grid centered columns={3}>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/userProfile'>
                <Icon name="user" size="huge"/>
                <Header as="h2">My Profile</Header>
              </Item>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/'>
                <Icon name="calendar alternate" size="huge" />
                <Header as="h2">My Calendar</Header>
              </Item>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/studyList'>
                <Icon name="user" size="huge" />
                <Header as="h2">My Study Sessions</Header>
              </Item>
            </Grid.Column>
          </Grid>
          <br/><Divider/>
          <Container centered>
          <Header as="h2">Upcoming Study Sessions</Header>
          <List divided verticalAlign='middle'>
            {this.props.sessions.map((session, index)=>
              <List.Item>
                <List.Content floated='right'>
                  <Modal size="mini" trigger={<Button>View Session</Button>} closeIcon>
                    <Modal.Content>
                      <StudySession session={session} key={index} />
                    </Modal.Content>
                  </Modal>
                </List.Content>
                <List.Content>{'Location: ' + session.location}</List.Content>
                <List.Content>{'Date: ' + session.date}</List.Content>
              </List.Item>
            )}
          </List>
          <Header as="h2">Other Students</Header>
          <Grid columns={3}>
              {this.props.users.map((user, index)=>
                <Grid.Column>
                  <User user={user} key={index} notes={index} />
                </Grid.Column>
              )}
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
  const subscription = Meteor.subscribe('Sessions');
  const userSubscription = Meteor.subscribe('Users');
  return {
    users: Users.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AdminHome);