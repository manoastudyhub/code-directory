import React from 'react';
import { Sessions, SessionSchema } from '/imports/api/session/session';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddStudySesh extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { firstName, lastName, createdBy, date, location, description, course, courseNum } = data;
    const owner = Meteor.user().username;
    const attending = Meteor.user().username;
    Sessions.insert({
      firstName, lastName, createdBy, date, location, description, attending, course, courseNum, owner,
    }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <div className="manoastudyhub-landing-background">
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Add Study Session</Header>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={SessionSchema} onSubmit={this.submit}>
                <Segment>
                  <Form.Group widths='equal'>
                    <TextField name='firstName'/>
                    <TextField name='lastName'/>
                  </Form.Group>
                  <TextField name='date'/>
                  <TextField name='location'/>
                  <LongTextField name='description'/>
                  <Form.Group widths='equal'>
                    <SelectField name='course'/>
                    <TextField name='courseNum'/>
                  </Form.Group>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                  <HiddenField name='attending' value='username'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default AddStudySesh;