import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// must manually import the stylesheets for each plugin
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

/** Uses FullCalendar's react component https://fullcalendar.io/docs/react */
/** Code used is based on FullCalendar's given runnable project https://codesandbox.io/s/2z6wp2jozn */

export default class CalendarApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: 'Event Now', start: new Date() },
    ],
  };

  render() {
    return (
        <div className="calendar-app">
          <div className="calendar-app-top">
            <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
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

  handleDateClick = arg => {
    /* eslint-disable-next-line */
    if (confirm('Would you like to add an event to this date?')) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };
}
