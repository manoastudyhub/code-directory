import React from 'react';
import { Meteor } from 'meteor/meteor';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';
import { Sessions } from '/imports/api/session/session';
import { withTracker } from 'meteor/react-meteor-data';
import { Modal } from 'semantic-ui-react';
import StudySession from '/imports/ui/components/StudySession';


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
};

  eventData() {
    const events = _.map(this.props.sessions, (s) => {
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


  render() {
    return (
        <div className="calendar-app">
          <div className="calendar-app-top">
            <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
            <button onClick={this.refreshData}>View Sessions</button>&nbsp;
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

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  refreshData = () => {
    this.eventData();
  }

  handleDateClick = () => {
    /* eslint-disable-next-line */
    if (confirm('Would you like to add an event to this date?')) {
      this.props.history.push('/add')
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
