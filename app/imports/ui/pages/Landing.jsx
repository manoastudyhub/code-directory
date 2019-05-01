import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="manoastudyhub-landing-background">
          <Grid container verticalAlign="middle">
            <Grid.Row columns="two">
              <Grid.Column>
                <Image src="/images/image1.png"/>
              </Grid.Column>
              <Grid.Column>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h3" className='styledHeader' inverted>
                        Manoa Study Hub
                      </Header>
                      <div>
                        An online web application created by University of Hawaii Manoa ICS students
                        in order to assist others in creating and finding study groups.
                      </div>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      <Grid container stackable centered columns={3}>
                        <Grid.Column textAlign={'center'}>
                          <Icon size="huge" name="book" inverted/>
                          <Header as="h2" inverted>Study Session</Header>
                          <Header as="h3" inverted>Create your own study session for any UH class
                            or join an already made one.</Header>
                        </Grid.Column>
                        <Grid.Column textAlign={'center'}>
                          <Icon size="huge" name="user circle" inverted/>
                          <Header as="h2" inverted>User Page</Header>
                          <Header as="h3" inverted>View your upcoming study sessions
                            as well as the tutors you have worked with previously.</Header>
                        </Grid.Column>
                        <Grid.Column textAlign={'center'}>
                          <Icon size="huge" name="calendar alternate outline" inverted/>
                          <Header as="h2" inverted>Calendar</Header>
                          <Header as="h3" inverted>Use our calendar feature to
                            monitor past and future study sessions.</Header>
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
