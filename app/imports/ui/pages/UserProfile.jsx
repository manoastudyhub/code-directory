import React from 'react';
import { Grid, Image, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserProfile extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Row>
            <Grid.Column width={8}>
              <h1>Ty Yamasaki</h1>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image size='small' square src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <h2>Current Courses</h2>
              <List>
                <List.Item>ICS 314</List.Item>
                <List.Item>ICS 311</List.Item>
                <List.Item>ICS 241</List.Item>
              </List>
              <h2>Courses Taken</h2>
              <List>
                <List.Item>ICS 111</List.Item>
                <List.Item>ICS 211</List.Item>
                <List.Item>ICS 212</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default UserProfile;
