import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Student extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.student.image} />
            <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
            <Card.Meta>{this.props.student.username}</Card.Meta>
            <Card.Meta>{this.props.student.classStanding}</Card.Meta>
            <Card.Meta>{this.props.student.major}</Card.Meta>
            <Card.Description>
              {this.props.student.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              {this.props.student.subjects}
            </a>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Student.propTypes = {
  student: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Student);
