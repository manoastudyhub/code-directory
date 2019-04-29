
import React from 'react';
import { Image, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  tutorCheck(tutorBool) {
    let tutorret;
    if (tutorBool === true) {
      tutorret = (<h2>Tutor</h2>);
    }
    return (tutorret);
  }

  render() {
    return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <br/>
              <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
              {this.tutorCheck(this.props.user.tutor)}
            </Grid.Column>
            <Grid.Column width={4}>
              <Image size='small' square src={this.props.user.image}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={6}>
              <h2>Major: </h2>
              <h3>{this.props.user.major}</h3>
            </Grid.Column>
            <Grid.Column textAlign="center" width={6}>
              <h2>Class Standing: </h2>
              <h3>{this.props.user.classStanding}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <h2>Subjects: </h2>
              <h3>{this.props.user.subject1}</h3>
              <h3>{this.props.user.subject2}</h3>
              <h3>{this.props.user.subject3}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <h2>Description</h2>
              <div>
                {this.props.user.description}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <Button>
                <Link to={`/editprofile/${this.props.user._id}`}>Edit Profile</Link>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);
