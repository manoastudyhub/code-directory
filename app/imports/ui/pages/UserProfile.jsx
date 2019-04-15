import React from 'react';
import { Students } from '../../api/student/student';
import { Grid, Image, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


/** A simple static component to render some text for the landing page. */
class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Row>
            <Grid.Column width={8}>
              <h1>{this.props.student.firstName}{this.props.student.lastName}</h1>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image size='small' square src={this.props.student.image}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>

            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Student documents in the props. */
UserProfile.propTypes = {
  student: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Student documents.
  const subscription = Meteor.subscribe('Students');
  return {
    student: Students.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(UserProfile);
