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
        
        <Grid centered columns="three">
          <Grid.Column>
            <Container centered>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='medium' />
            <h2 textAlign="center">Name</h2>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container inverted>
              <h2>Major</h2>
              <p>Computer Science</p>
              <h2>Courses Taken</h2>
              <List bulleted>
                <List.Item><Icon name='computer' /> ICS 111</List.Item>
                <List.Item><Icon name='computer' /> ICS 211</List.Item>
                <List.Item><Icon name='computer' /> ICS 212</List.Item>
                <List.Item><Icon name='computer' /> ICS 141</List.Item>
                <List.Item><Icon name='computer' /> ICS 241</List.Item>
              </List>
              <h2>Current Courses</h2>
              <List bulleted>
                <List.Item><Icon name='computer' /> ICS 314</List.Item>
                <List.Item><Icon name='computer' /> ICS 311</List.Item>
              </List>
              <h2>Time Available</h2>
              <p>Monday, Wednesday and Friday after 2pm</p>
            </Container>
          </Grid.Column>
          
        </Grid>
      </div>
    );
  }
}