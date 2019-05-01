import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/user';
import Profile from '/imports/ui/components/Profile';


/** A simple static component to render some text for the landing page. */
class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className="manoastudyhub-landing-background">
        <Container>
          {this.props.users.map((user, index) => <Profile key={index} user={user}/>)}
        </Container>
        </div>
    );
  }
}
/** Require an array of Student documents in the props. */
UserProfile.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Student documents.
  const subscription = Meteor.subscribe('Users');
  return {
    users: Users.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(UserProfile);
