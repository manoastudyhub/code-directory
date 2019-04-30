import React from 'react';
import { Grid } from 'semantic-ui-react';
import CalendarAppAdmin from './CalendarAppAdmin';


/** Uses FullCalendar and based on https://codesandbox.io/s/2z6wp2jozn */

/** A simple static component to render some text for the landing page. */
class CalendarAdmin extends React.Component {
  render() {
    const calendarSize = { height: '1000px', paddingTop: '100px' };
    return (
        <div className="manoastudyhub-calendar-background">
          <Grid container verticalAlign="middle" style={calendarSize}>
            <CalendarAppAdmin />;
          </Grid>
        </div>
    );
  }
}

export default CalendarAdmin;
