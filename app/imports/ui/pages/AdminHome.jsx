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
  Table
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
            <Container>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Current Study Sesh's Planned</Table.HeaderCell>
                  <Table.HeaderCell>Tutors</Table.HeaderCell>
                  <Table.HeaderCell>Tutees</Table.HeaderCell>
                  <Table.HeaderCell>Total User Base</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>50</Table.Cell>
                  <Table.Cell>60</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>4pm Keller</Table.Cell>
                  <Table.Cell>John Smith</Table.Cell>
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
            <Menu widths={3} centered>
              <Menu.Item>Manage Admin Profile</Menu.Item>
              <Menu.Item>Manage Study Sesh's</Menu.Item>
              <Menu.Item>Manage Users</Menu.Item>
            </Menu>
      </div>
    );
  }
}