import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/student/student';
import Profile from '/imports/ui/components/Profile';


/** A simple static component to render some text for the landing page. */
class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          {this.props.students.map((student, index) => <Profile key={index} student={student}/>)}
        </Container>
    );
  }
}
/** Require an array of Student documents in the props. */
UserProfile.propTypes = {
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Student documents.
  const subscription = Meteor.subscribe('Students');
  return {
    students: Students.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(UserProfile);

