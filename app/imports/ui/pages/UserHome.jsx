import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Menu, Image, Icon, Button, Grid, List, Divider } from 'semantic-ui-react';

export default class UserHome extends React.Component {
  render() {
    return (
      <div>
          <Grid centered columns={3}>
            <Grid.Column textAlign="center">
              <Icon name="user" size="huge"/>
              <Header as="h2">My Profile</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Icon name="calendar alternate" size="huge" />
              <Header as="h2">My Calendar</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Icon name="user" size="huge" />
              <Header as="h2">My Study Sessions</Header>
            </Grid.Column>
          </Grid>
          <br/><Divider/>
          <Container centered>
          <Header as="h2">Upcoming Study Sessions</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
            <List.Content floated='right'><Button>View Session</Button></List.Content>
            <List.Content>Sinclair 4pm</List.Content></List.Item>
            <List.Item>
            <List.Content floated='right'><Button>View Session</Button></List.Content>
            <List.Content>Hamilton 5pm</List.Content></List.Item>
            <List.Item>
            <List.Content floated='right'><Button>View Session</Button></List.Content>
            <List.Content>Keller 12pm</List.Content></List.Item>
          </List>
          <Header as="h2">My Tutors</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              <List.Content floated='right'><Button>Contact</Button></List.Content>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny' />
              <List.Content>Tom Smith</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'><Button>Contact</Button></List.Content>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' size='tiny' />
              <List.Content>Erica Smith</List.Content>
              </List.Item>
            <List.Item>
              <List.Content floated='right'><Button>Contact</Button></List.Content>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' size='tiny' />
              <List.Content>Jane Smith</List.Content></List.Item>
          </List>
          </Container>
      </div>
    );
  }
}
