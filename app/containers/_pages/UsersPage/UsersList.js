import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
  Scroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
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

      count: 0,
      page: 0,
      rowsPerPage: 10,
    };

    this.changePage = this.changePage.bind(this);
    this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  setStateProcessing() {
    this.setState({ processing: true });
  }

  unsetStateProcessing() {
    this.setState({ processing: false });
  }

  changePage(event, newPage) {
    this.setState({ page: newPage }, () => {
      this.fetchData();
    });
  }

  changeRowsPerPage(event) {
    this.setState({ page: 0, rowsPerPage: event.target.value }, () => {
      this.fetchData();
    });
  }

  fetchData() {
    apiGet({
      component: this,
      path: '/users',
      params: {
        page: this.state.page + 1,
        per_page: this.state.rowsPerPage,
      },
      afterSuccess: result => {
        this.setState({
          count: result.count,
          users: result.users,
        });
      },
    });
  }

  render() {
    return (
      <Paper fullHeight noPadding pagination>
        <Scroll>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width="200px">
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
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={this.state.count}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.changePage}
          onChangeRowsPerPage={this.changeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default UsersList;
