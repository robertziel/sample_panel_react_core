import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
  Scroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'components/_ui-elements';

import { apiGet } from 'containers/BackendApiConnector/fetchers';
import FetchedContent from 'containers/FetchedContent';

import messages from './messages';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processing: true,
      users: [],
    };

    this.fetchData();
  }

  setStateProcessing() {
    this.setState({ processing: true });
  }

  unsetStateProcessing() {
    this.setState({ processing: false });
  }

  fetchData() {
    apiGet({
      component: this,
      path: '/users',
      afterSuccess: result => {
        this.setState({ users: result });
      },
    });
  }

  render() {
    return (
      <Paper fullHeight noPadding>
        <Scroll>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormattedMessage {...messages.labelUsername} />
                </TableCell>
                <TableCell>
                  <FormattedMessage {...messages.labelEmail} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <FetchedContent processing={this.state.processing}>
                {this.state.users.map(user => (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </FetchedContent>
            </TableBody>
          </Table>
        </Scroll>
      </Paper>
    );
  }
}

export default UsersList;
