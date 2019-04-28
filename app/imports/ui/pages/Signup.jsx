import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '/imports/api/user/user';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */

const classStandingOptions = [
  { key: 'freshman', text: 'Freshman', value: 'Freshman' },
  { key: 'sophomore', text: 'Sophomore', value: 'Sophomore' },
  { key: 'junior', text: 'Junior', value: 'Junior' },
  { key: 'Senior', text: 'Senior', value: 'Senior' },

];
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      classStanding: '',
      image: '',
      major: '',
      subject1: '',
      subject2: '',
      subject3: '',
      description: '',
      tutor: false,
      error: '',
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, firstName, lastName, classStanding, image, major, subject1, subject2,
      subject3, description, tutor } = this.state;
    const subjects = [subject1, subject2, subject3];
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');

      }
    });
    Users.insert({ firstName: firstName, lastName: lastName, owner: email,
      classStanding: classStanding, image: image, major: major, subject1: subject1,
      subject2: subject2, subject3: subject3, subjects: subjects, description: description, tutor: tutor });
  }

  /** Display the signup form. */
  render() {
    return (
        <div className="manoastudyhub-landing-background">
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Grid columns={2}>
                    <Grid.Column>
                    <Form.Input
                        label="First Name"
                        icon="user"
                        iconPosition="left"
                        name="firstName"
                        placeholder="John"
                        type="firstName"
                        onChange={this.handleChange}
                    />
                    </Grid.Column>
                    <Grid.Column>
                    <Form.Input
                        label="Last Name"
                        icon="user"
                        iconPosition="left"
                        name="lastName"
                        placeholder="Foo"
                        type="lastName"
                        onChange={this.handleChange}
                    />
                    </Grid.Column>
                  </Grid>
                  <Form.Select
                      label="Class Standing"
                      options={classStandingOptions}
                      placeholder="Class Standing"
                      name="classStanding"
                      type="classStanding"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                        label="Image"
                        icon="image"
                        iconPosition="left"
                        name="image"
                        placeholder="Image"
                        type=""
                        onChange={this.handleChange}
                  />
                  <Form.Input
                        label="Major"
                        icon="book"
                        iconPosition="left"
                        name="major"
                        placeholder="Computer Science"
                        type="major"
                        onChange={this.handleChange}
                  />
                  <Form.Input
                        label="Add Subject 1"
                        placeholder="ICS 313"
                        type="subject1"
                        name="subject1"
                        onChange={this.handleChange}
                  />
                  <Form.Input
                        label="Add Subject 2"
                        placeholder="ICS 313"
                        type="subject2"
                        name="subject2"
                        onChange={this.handleChange}
                  />
                  <Form.Input
                        label="Add Subject 3"
                        placeholder="ICS 313"
                        type="subject3"
                        name="subject3"
                        onChange={this.handleChange}
                  />
                  <Form.Input
                        label="Description"
                        placeholder="Description"
                        type="description"
                        name="description"
                        onChange={this.handleChange}
                  />

                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}
