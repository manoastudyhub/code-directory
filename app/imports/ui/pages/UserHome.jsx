import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Container,
  Header,
  Menu,
  Dropdown,
  Item,
  Image,
  Icon,
  Button,
  Grid,
  List,
  Card
} from 'semantic-ui-react';

export default class UserHome extends React.Component{
  render(){
    return(
      <div>
        <Menu>
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Create Study Sesh</Menu.Item>
          <Menu.Item>Study Sesh's</Menu.Item>
          <Menu.Item>Calendar</Menu.Item>
        </Menu>     
        
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
              <Header as="h2">My Study Sesh's</Header>
            </Grid.Column>
          </Grid>
          <Header as="h2">Upcoming Study Sesh's</Header>
          <List>
            <List.Item><a>Sinclair 4pm</a></List.Item>
            <List.Item><a>Hamilton 5pm</a></List.Item>
            <List.Item><a>Keller 12pm</a></List.Item>
          </List>
          <Header as="h2">My Tutors</Header>
          <List>
            <List.Item><Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny' />Erica Smith</List.Item>
            <List.Item><Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny' />Tom Smith</List.Item>
            <List.Item><Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='tiny' />Erica Smith</List.Item>


          </List>
      </div>
    );
  }
}