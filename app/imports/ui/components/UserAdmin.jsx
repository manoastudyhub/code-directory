import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserAdmin extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.user.image} />
            <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
            <Card.Meta>{this.props.user.username}</Card.Meta>
            <Card.Meta>{this.props.user.classStanding}</Card.Meta>
            <Card.Meta>{this.props.user.major}</Card.Meta>
            <Card.Description>
              {this.props.user.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              {this.props.user.subjects}
            </a>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/delete/${this.props.user._id}`}>Delete</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
UserAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserAdmin);
