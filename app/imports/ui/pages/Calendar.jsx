import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Grid } from 'semantic-ui-react';

/** Uses FullCalendar*/

/** A simple static component to render some text for the landing page. */
class Calendar extends React.Component {
  render() {
    const calendarSize = { height: '1000px', paddingTop: '100px' };
    return (
        <div className="manoastudyhub-calendar-background">
          <Grid container verticalAlign="middle" style={calendarSize}>
          <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
          </Grid>
        </div>
    );
  }
}

export default Calendar;
