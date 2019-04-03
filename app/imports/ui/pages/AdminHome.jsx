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
  Card,
  Table,
  Divider
} from 'semantic-ui-react';

export default class AdminHome extends React.Component{
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
              <Header as="h2">Manage Admin Profile</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Icon name="pencil" size="huge" />
              <Header as="h2">Manage Study Sesh's</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Icon name="users" size="huge" />
              <Header as="h2">Manage Users</Header>
            </Grid.Column>
          </Grid>
          <br /><Divider />
            <Container>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Current Study Sesh's Planned</Table.HeaderCell>
                  <Table.HeaderCell>Tutors</Table.HeaderCell>
                  <Table.HeaderCell>Tutees</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                
                <Table.Row>
                  <Table.Cell>4pm Keller</Table.Cell>
                  <Table.Cell>John Smith</Table.Cell>
                  <Table.Cell>Jane Doe</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>1pm Hamilton</Table.Cell>
                  <Table.Cell>Eric Smith</Table.Cell>
                  <Table.Cell>Jane Doe</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>2pm Sinclair</Table.Cell>
                  <Table.Cell>Tom Erickson</Table.Cell>
                  <Table.Cell>Ashley Newman</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>12pm Hamilton</Table.Cell>
                  <Table.Cell>Maya Lastname</Table.Cell>
                  <Table.Cell>Jim Miller</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Container>
      </div>
    );
  }
}