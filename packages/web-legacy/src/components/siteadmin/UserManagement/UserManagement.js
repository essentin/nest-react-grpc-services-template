import React from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import { FormControl, FormGroup, Button } from 'react-bootstrap';
import cx from 'classnames';
import Confirm from 'react-confirm-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './UserManagement.css';

import Link from '../../../components/Link';
import UserManageModal from './UserManageModal/UserManageModal';
import CreateHostModal from './CreateHostModal/CreateHostModal';
import CustomPagination from '../../CustomPagination';

import { updateBanServiceHistoryStatus } from '../../../actions/siteadmin/updateBanServiceHistoryStatus';
import { openMangeUserModal, openCreateHostModal } from '../../../actions/siteadmin/modalActions';
import { deleteUser, updateUserType } from '../../../actions/siteadmin/users';

import messages from './messages';

import usersQuery from './usersQuery.graphql';

class UserManagement extends React.Component {
  static propTypes = {
    userManagement: PropTypes.array,
    editUser: PropTypes.any,
    deleteUser: PropTypes.any,
    title: PropTypes.string.isRequired,
    updateBanServiceHistoryStatus: PropTypes.any.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
      userType: '',
      typing: false,
      typingTimeout: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleChangeUserType = this.handleChangeUserType.bind(this);
    this.handleManageClick = this.handleManageClick.bind(this);
  }
  async handleChange(e, userId, userMail, userName) {
    const { updateBanServiceHistoryStatus } = this.props;
    const { currentPage, searchList, userType } = this.state;
    let id = userId;
    let banStatus = e.target.value;

    await updateBanServiceHistoryStatus(id, banStatus, userMail, userName, currentPage, searchList, userType);
  }

  async handleChangeUserType(id, userType) {
    const { updateUserType } = this.props;
    const { currentPage, searchList, userType: searchUserType } = this.state;

    await updateUserType(id, userType, currentPage, searchList, searchUserType)
  }

  handleDropDown(e) {
    const { userManagement: { refetch } } = this.props

    let variables = {
      userType: e.target.value,
      currentPage: 1
    };

    this.setState({ userType: e.target.value });
    this.setState({ currentPage: 1 });
    refetch(variables)
  }

  paginationData(currentPage) {
    const { userManagement: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  handleClick(searchList) {
    const { userManagement: { refetch } } = this.props;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  deleteChange(id, profileId, userTypes) {
    const { deleteUser, closeManageUserModal } = this.props;
    const { userManagement: { refetch } } = this.props;

    let variables = { currentPage: 1 };
    deleteUser(id, profileId, userTypes);
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  handleManageClick(maxInvites, profileId) {
    const { openMangeUserModal } = this.props;
    const { currentPage, userType, searchList } = this.state;
    openMangeUserModal(maxInvites, profileId, currentPage, userType, searchList);
  }

  handleCreateHostClick() {
    const { openCreateHostModal } = this.props;
    const { currentPage, userType, searchList } = this.state;
    openCreateHostModal({ currentPage, userType, searchList });
  }

  render() {
    const { title, openCreateHostModal } = this.props;
    const { userManagement: { userManagement }, intl: { formatMessage } } = this.props;
    const { currentPage, searchList, userType } = this.state;
    let userTypes = 'admin';
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <UserManageModal />
          <CreateHostModal />
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
            {
              userManagement && userManagement.usersData && userManagement.usersData.length > 0 && <a
                href={"/export-admin-data?type=users&usertype=" + userType + "&keyword=" + searchList}
                className={cx('pull-right', s.exportLink)}
              >
                Export Data into CSV
            </a>
            }
            <div className={cx('col-md-4', s.seachContent)} >
              <FormControl
                type="text"
                placeholder={'Search'}
                onChange={(e) => this.handleSearchChange(e)}
              />
            </div>
            <div className={cx('col-md-2', s.seachContent)}>
              <FormGroup bsSize="small" controlId="formControlsSelect" >
                <FormControl onChange={(e) => this.handleDropDown(e)} componentClass="select" placeholder="select" className={cx(s.userSelect, s.selectSection)}>
                  <option value="">{formatMessage(messages.all)}</option>
                  <option value="1">{formatMessage(messages.guest)}</option>
                  <option value="2">{formatMessage(messages.host)}</option>
                </FormControl>
              </FormGroup>
            </div>
            <div>
              <Button className={cx(s.button, s.btnPrimary, s.btnlarge)}  onClick={()=>this.handleCreateHostClick()} >{formatMessage(messages.createHost)}</Button>
            </div>
            <Table className="table"
              noDataText="No matching records found."
              sortable={true}
              defaultSort={{ column: 'Created Date', direction: 'desc' }}
            >
              {
                userManagement && userManagement.usersData.length > 0 && userManagement.usersData.map((value, key) => {
                  let banStatus = value.userBanStatus, recordId = value.id, userMail = value.email,
                    userName = value.profile && value.profile.firstName + ' ' + value.profile.lastName,
                    maxInvites = value && value.profile && value.profile.maxInviteCount, profileId = value && value.profile && value.profile.profileId;
                  banStatus = banStatus === 1 ? "1" : "0";

                  return (
                    <Tr key={key}>
                      <Td column={"Profile ID"} data={value.profile && value.profile.profileId} className={s.userVerticalAlign} />
                      <Td column={"First name"} data={value.profile && value.profile.firstName} className={s.userVerticalAlign} />
                      <Td column={"Last name"} data={value.profile && value.profile.lastName} className={s.userVerticalAlign} />
                      <Td column={"Email address"} data={value.email} className={s.userVerticalAlign} />
                      <Td column={"Phone number"} data={value.profile && value.profile.phoneNumber} className={s.userVerticalAlign} />
                      <Td column={"Created Date"} data={moment(value.profile && value.profile.createdAt).format('YYYY-MM-DD')} className={s.userVerticalAlign} />
                      <Td column={"View"} className={s.userVerticalAlign}>
                        <Link to={"/siteadmin/profileView/" + ((value.profile) ? value.profile.profileId : '')} >
                          View
                        </Link>
                      </Td>
                      {
                        <Td column="User Type">
                          <select name="userType" className={cx(s.formControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
                            onChange={(e) => this.handleChangeUserType(recordId, e.target.value)} value={value.userType}>
                            <option value="">{formatMessage(messages.select)}</option>
                            <option value="1">{formatMessage(messages.guest)}</option>
                            <option value="2">{formatMessage(messages.host)}</option>
                          </select>
                        </Td>
                      }
                      {
                        <Td column="Action">
                          <select name="userBanStatus" className={cx(s.formControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
                            onChange={(e) => this.handleChange(e, recordId, userMail, userName)} value={banStatus}>
                            <option value="">Select</option>
                            <option value="1">Ban</option>
                            <option value="0">UnBan</option>
                          </select>
                        </Td>
                      }
                      <Td column="Manage">
                        <div>
                          <a href="javascript:void(0)" onClick={() => this.handleManageClick(maxInvites, profileId)}>Manage</a>
                        </div>
                      </Td>
                      <Td column="Delete">
                        <div>
                          <Confirm
                            onConfirm={() => this.deleteChange(value.id, value.profile && value.profile.profileId, userTypes)}
                            body="Are you sure you want to delete this?"
                            confirmText="Confirm Delete"
                            title="Deleting User"
                          >
                            <a href="javascript:void(0)">Delete</a>
                          </Confirm>
                        </div>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
            {
              userManagement && userManagement.usersData && userManagement.usersData.length > 0
              && <div>
                <CustomPagination
                  total={userManagement.count}
                  currentPage={currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel={'Users'}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = {
  updateBanServiceHistoryStatus,
  deleteUser,
  updateUserType,
  openMangeUserModal,
  openCreateHostModal
};
export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(usersQuery, {
    name: 'userManagement',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
        userType: ''
      },
      fetchPolicy: 'network-only'
    }
  })
)(UserManagement);