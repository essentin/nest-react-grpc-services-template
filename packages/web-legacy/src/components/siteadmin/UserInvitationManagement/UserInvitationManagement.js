import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';

import { Table, Tr, Td } from 'reactable';
import { toastr } from 'react-redux-toastr';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormControl, Button } from 'react-bootstrap';

import s from './UserInvitationManagement.css';

import CustomPagination from '../../CustomPagination/CustomPagination';

import { sendEmail } from '../../../core/email/sendEmail';

import invitesQuery from './invitesQuery.graphql';
import messages from '../../../locale/messages';

class UserInvitationManagement extends React.Component {
  static propTypes = {
    getAllInvites: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0,
    };
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleSendInviteModal = this.toggleSendInviteModal.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { loading } = newProps;
    const {
      getAllInvites: { refetch },
    } = this.props;
    if (loading === false) {
      let variables = { currentPage: this.state.currentPage };
      refetch(variables);
    }
  }

  paginationData(currentPage) {
    const {
      getAllInvites: { refetch },
    } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  handleClick(searchList) {
    const {
      getAllInvites: { refetch },
    } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList,
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  handleSearchChange = (event) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450),
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { currentPage, searchList } = this.state;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{formatMessage(messages.userInvitationManagement)}</h1>
          <div className={cx('table-responsive', 'listing-table')}>
            <div className={cx('col-md-4', s.seachContent)}>
              <FormControl
                type="text"
                placeholder={'Search'}
                onChange={(e) => this.handleSearchChange(e)}
              />
            </div>
            <div className={cx('col-md-2', s.seachContent)}>
              <Button className="btn btn-sm btn-primary px-5" onClick={this.toggleSendInviteModal} >Send Invite</Button>
            </div>
            <Table
              className="table"
              noDataText="No matching records found."
              sortable={true}
              defaultSort={{ column: 'Id', direction: 'desc' }}
            >
              {getAllInvites &&
                getAllInvites.results.length > 0 &&
                getAllInvites.results.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td column={'ID'} data={value.id} />
                      <Td column={'Email'} data={value.email} />
                      <Td column={'First name'} data={value.firstName} />
                      <Td column={'Invite status'} data={value.inviteStatus} />
                      <Td column={'Re-invite'} >
                        {value.inviteStatus === 'invited' ?
                          <a href="javascript:void(0)" onClick={() => this.sendReInvite({ firstName: value.firstName, email: value.email })}>Re-invite</a> : ''}
                      </Td>
                    </Tr>
                  );
                })}
            </Table>
            {getAllInvites &&
              getAllInvites.results &&
              getAllInvites.results.length > 0 && (
                <div>
                  <CustomPagination
                    total={getAllInvites.count}
                    currentPage={currentPage}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    change={this.paginationData}
                    paginationLabel={'Invites'}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  loading: state.invite.loading
});

const mapDispatch = { };

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(invitesQuery, {
    name: 'getAllInvites',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
      },
      fetchPolicy: 'network-only',
    },
  }),
)(UserInvitationManagement);