import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Students } from '/imports/api/student/student';
import Student from '/imports/ui/components/Student';
import { Tutors } from '/imports/api/tutor/tutor';
import Tutor from '/imports/ui/components/Tutor';
import { Sessions } from '/imports/api/session/session';
import StudySession from '/imports/ui/components/StudySession';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { withRouter, NavLink } from 'react-router-dom';
import { Container, Header, Menu, Image, Icon, Button, Grid, List, Divider, Item, Loader, Modal } from 'semantic-ui-react';

class UserHome extends React.Component {
  /*Test Data*/
   myStudents=[{
    firstName: 'Philip', lastName: 'Johnson', classStanding: 'Junior',
    image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
    major: 'Computer Science', subjects: 'MATH, BIO',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
        'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
    {
      firstName: 'Henri', lastName: 'Casanova', classStanding: 'Senior',
      image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
      major: 'Math', subjects: 'MATH, BIO',
      description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
          'that I ran the Hana relay with an actual Team.',
    },
    {
      firstName: 'Kim', lastName: 'Binsted', classStanding: 'Senior',
      image: 'https://pbs.twimg.com/profile_images/798636728852434944/Y2EMD2i5_400x400.jpg',
      major: 'BIO', subjects: 'MATH, BIO',
      description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence' +
          'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
          'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
          '"What do you call a Martian who drinks beer? An ale-ien!".',
    },
  ];
  mySessions = [{
      firstName: 'Max',
      lastName: 'Deyo',
      date: '4/25/19',
      location: 'Hamilton',
      owner: 'Smith',
      description: 'Math',
      type: 'TA',
    },
    {
      firstName: 'Alex',
      lastName: 'Jones',
      date: '4/30/19',
      location: 'Keller',
      owner: 'Smith',
      description: 'Math',
      type: 'group',
    },
  ];
  /*render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }*/
  render() {
    return (
      <div>
          <Grid centered columns={3}>
            <Grid.Column textAlign="center">
              <Item as={NavLink} exact to='/profile'>
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
          {this.props.sessions.map((session, index) => <StudySession key={index} session={session} />)}
            {/*this.props.sessions.map((session)=>
              <List.Item>
                <List.Content floated='right'>
                  <Modal size="mini" trigger={<Button>View Session</Button>} closeIcon>
                    <Modal.Content>
                      <StudySession session={session} centered/>
                    </Modal.Content>
                  </Modal>
                </List.Content>
                <List.Content>{'Location: ' + session.location}</List.Content>
                <List.Content>{'Date: ' + session.date}</List.Content>
              </List.Item>
            )*/}
          </List>
          <Header as="h2">Other Students</Header>
          <Grid columns={3}>
              {this.props.students.map((student, index)=>
                <Grid.Column>
                  <Student student={student} key={index} notes={index} />
                </Grid.Column>
              )}
          </Grid>
          </Container>
      </div>
    );
  }
}


UserHome.propTypes = {
  students: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    students: Students.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserHome);