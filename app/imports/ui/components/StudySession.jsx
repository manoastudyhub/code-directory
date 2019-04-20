import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudySession extends React.Component {
  render() {
    return (
        /* Eventually change src of image to this.props.profile.image in curly braces */
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            <Card.Header>
              {this.props.session.firstName} {this.props.session.lastName}
            </Card.Header>
            <Card.Meta>
              {this.props.session.date} {this.props.session.location}
            </Card.Meta>
            <Card.Description>
              {this.props.session.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button basic color='green'>
              Attend
            </Button>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.session._id}`}>Edit</Link>
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
