import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import { Sessions, SessionSchema } from '/imports/api/session/session';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SelectField from 'uniforms-semantic/SelectField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditStudy extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, date, location, description, course, courseNum, _id } = data;
    Sessions.update(_id, { $set: {
        firstName, lastName, date, location, description, course, courseNum } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <div className="manoastudyhub-landing-background">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Study Session</Header>
            <AutoForm schema={SessionSchema} onSubmit={this.submit} model={this.props.doc}>
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
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

/** Require the presence of a Session document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStudy.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Sessions documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    doc: Sessions.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStudy);