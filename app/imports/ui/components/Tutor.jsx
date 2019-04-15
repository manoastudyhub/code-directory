import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Tutor extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.tutor.image} />
            <Card.Header>{this.props.tutor.firstName} {this.props.tutor.lastName}</Card.Header>
            <Card.Meta>{this.props.tutor.classStanding}</Card.Meta>
            <Card.Meta>{this.props.tutor.major}</Card.Meta>
            <Card.Description>
              {this.props.tutor.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              {this.props.tutor.subjects}
            </a>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Tutor.propTypes = {
  tutor: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Tutor);
