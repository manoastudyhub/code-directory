import React from 'react';
import { Meteor } from 'meteor/meteor';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Sessions, SessionSchema } from '/imports/api/session/session';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import SelectField from 'uniforms-semantic/SelectField';


// must manually import the stylesheets for each plugin
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';


/** Uses FullCalendar's react component https://fullcalendar.io/docs/react */
/** Code used is based on FullCalendar's given runnable project https://codesandbox.io/s/2z6wp2jozn */

class CalendarApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [{}],
    redirect: false,
    argdate: '04/26/2019',
  };


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
    const { firstName, lastName, location, description, course, courseNum } = data;
    const { date } = this.state;
    const owner = Meteor.user().username;
    const attending = Meteor.user().username;
    Sessions.insert({
      firstName, lastName, date, location, description, attending, course, courseNum, owner,
    }, this.insertCallback);
  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return (
          <div className="manoastudyhub-landing-background">
            <Grid container centered>
              <Grid.Column>
                <Header as="h2" textAlign="center">Add Study Session</Header>
                <AutoForm ref={(ref) => { this.formRef = ref; }} schema={SessionSchema} onSubmit={this.submit}>
                  <Segment>
                    <Form.Group widths='equal'>
                      <TextField name='firstName'/>
                      <TextField name='lastName'/>
                    </Form.Group>
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
                    <HiddenField name='date' value='4/26/2019'/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </div>
      );
    }

    return (
        <div className="calendar-app">
          <div className="calendar-app-top">
            <button onClick={this.toggleWeekends}>toggle weekends</button>
            &nbsp;
            <button onClick={this.refreshData}>View Sessions</button>
            &nbsp;
            &nbsp; (Click a date to add a study session!)
          </div>
          <div className="calendar-app-calendar">
            <FullCalendar
                defaultView="dayGridMonth"
                header={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                dateClick={this.handleDateClick}
            />
          </div>
        </div>
    );
  }

  eventData() {
    // const test = _.map(this.props.sessions, (s) => s.attending);
    // const filteringEvents = _.some(test, function (entry) { return entry.includes('Meteor.user().username'); });
    const filtering = _.filter(this.props.sessions, (session) => { return session.attending.indexOf(Meteor.user().username) > -1; });
    const events = _.map(filtering, (s) => {
      return {
        title: s.course,
        start: s.date,
      };
    });

    this.setState({
      // update a property
      calendarEvents: events,
    });
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  refreshData = () => {
    this.eventData();
  }

  handleDateClick = arg => {
    /* eslint-disable-next-line */
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.setState({ date: arg.date });
      this.setState({ redirect: true });
    }
  };
}

/** Require an array of Stuff documents in the props. */
CalendarApp.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CalendarApp);
