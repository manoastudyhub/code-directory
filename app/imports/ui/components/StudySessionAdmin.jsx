import React from 'react';
import { Card, Image, Button, List, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Sessions } from '/imports/api/session/session';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

class StudySessionAdmin extends React.Component {

  constructor() {
    super();
    this.state = {
      example: false };
    this.deleteSession = this.deleteSession.bind(this);
  }

  changeState() {
    const example = this.state.example;
    this.setState({ example: !example });
  }
  deleteSession(){
    Sessions.remove(this.props.session._id);
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
              Created By {this.props.session.firstName} {this.props.session.lastName}
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
          <Button.Group>
              <div>
                  <Modal size="mini" trigger={<Button basic color='green'>View Attendees</Button>} closeIcon>
                    <Modal.Content>
                      <List>
                        {this.props.session.attending.map((attendee, index) =>
                          <List.Item key={index}>{attendee}</List.Item>)
                        }
                      </List>
                    </Modal.Content>
                  </Modal>
              </div>
              <Button basic color='blue'><Link to={`/edit/${this.props.session._id}`}>Edit</Link></Button>
              <br />
              <Button onClick={this.deleteSession} basic color='red'>Delete</Button>
            </Button.Group>
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
