import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className={'manoastudyhub-landing-background'}>
          <Grid container stackable centered columns={1}>
            <Grid.Column textAlign={'center'}>
              <Header as="h1" inverted>Welcome Students and Tutors</Header>
              <Header as="h3" inverted>Connect with tutors or other students for study sessions.
                Login to create or join a study session!</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
