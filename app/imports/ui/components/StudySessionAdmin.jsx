import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudySessionAdmin extends React.Component {

  constructor() {
    super();
    this.state = {
      example: false };
  }

  changeState() {
    const example = this.state.example;
    this.setState({ example: !example });
  }

  render() {
    return (
        /* Eventually change src of image to this.props.profile.image in curly braces */
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            <Card.Header>
              {this.props.session.course}
            </Card.Header>
            <Card.Meta>
              Created By: {this.props.session.createdBy}
            </Card.Meta>
            <Card.Meta>
              In collaboration with {this.props.session.firstName} {this.props.session.lastName}
            </Card.Meta>
            <Card.Meta>
              When: {this.props.session.date}
            </Card.Meta>
            <Card.Meta>
              Where: {this.props.session.location}
            </Card.Meta>
            <Card.Description>
              {this.props.session.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Button basic color='green' onClick={this.changeState.bind(this)}>
                Attend
              </Button>
              {this.state.example === false ? null : Bert.alert({ type: 'success', message: 'Session Added!' })}
            </div>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.session._id}`}>Edit</Link>
            <br />
            <Link to={`/delete/${this.props.session._id}`}>Delete</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StudySessionAdmin.propTypes = {
  session: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySessionAdmin);
