import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudySession extends React.Component {

  constructor() {
    super();
    this.state = {
      example: false };
  }

  changeState = () => {
    const example = this.state.example;
    this.setState({ example: !example });
  }

  renderElement() {
    if (this.props.session.owner === Meteor.user().username) {
      return <Link to={`/edit/${this.props.session._id}`}>Edit</Link>;
    }
    return <Link to={`/attend/${this.props.session._id}`}>Attend</Link>;
  }

  render() {
    return (
        /* Eventually change src of image to this.props.profile.image in curly braces */
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            <Card.Header>
              {this.props.session.course} {this.props.session.courseNum}
            </Card.Header>
            <Card.Meta>
               Created By: {this.props.session.firstName} {this.props.session.lastName}
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
            {this.renderElement()}
          </Card.Content>
        </Card>
    );
  }
}


/** Require a document to be passed to this component. */
StudySession.propTypes = {
  session: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);
