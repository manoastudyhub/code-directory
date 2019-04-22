
import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <br/>
              <h1>{this.props.student.firstName} {this.props.student.lastName}</h1>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image size='small' square src={this.props.student.image}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={6}>
              <h2>Major: </h2>
              <h3>{this.props.student.major}</h3>
            </Grid.Column>
            <Grid.Column textAlign="center" width={6}>
              <h2>Class Standing: </h2>
              <h3>{this.props.student.classStanding}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <h2>Subjects: </h2>
              <h3>{this.props.student.subjects}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" width={8}>
              <h2>Description</h2>
              <div>
                {this.props.student.description}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  student: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);