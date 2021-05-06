import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Redux Action
import { removeListing } from '../../../actions/siteadmin/ListingManagement/removeListing';
import { updateIsPartner } from '../../../actions/siteadmin/ListingManagement/UpdateIsPartner';

import messages from './messages';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';
import CustomPagination from '../../CustomPagination';
import listingsQuery from './listingsQuery.graphql';
import { FormControl } from 'react-bootstrap';
class ListingManagement extends React.Component {
  static propTypes = {
    getAllListings: PropTypes.array,
    title: PropTypes.string.isRequired
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
  }
  paginationData(currentPage) {
    const {
      getAllListings: { refetch },
    } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  handleClick(searchList) {
    const {
      getAllListings: { refetch },
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

  async deleteListing(id, type) {
    const { removeListing } = this.props;
    const {
      getAllListings: { refetch },
    } = this.props;

    let variables = { currentPage: 1 };
    await removeListing(id, type);
    this.setState({ currentPage: 1 });
    await refetch(variables);
  }

  handlePartnerChange(e, id, userId) {
    console.log(userId)
    const { currentPage, searchList } = this.state;
    const { updateIsPartner } = this.props;
    updateIsPartner({
      id, 
      isPartner: e.target.value === "true" ? true : false, 
      currentPage, 
      searchList,
      userId
    })
  }

  render() {
    const {
      intl: { formatMessage },
      title,
    } = this.props;
    const {
      getAllListings: { loading, getAllListings },
    } = this.props;
    const { currentPage, searchList } = this.state;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={cx('table-responsive', 'listing-table')}>
            {getAllListings && getAllListings.usersData.length > 0 && (
              <a
                href="/export-admin-data?type=listings"
                className={cx('pull-right', s.exportLink)}
              >
                Export Data into CSV
              </a>
            )}
            <div className={cx('col-md-4', s.seachContent)}>
              <FormControl
                type="text"
                placeholder={'Search'}
                onChange={(e) => this.handleSearchChange(e)}
              />
            </div>
            <Table
              className="table"
              // filterable={['id', 'Owner Name', 'Owner Email', 'City', 'State', 'Country']}
              noDataText="No matching records found."
              sortable={true}
              defaultSort={{ column: 'Id', direction: 'desc' }}
              // itemsPerPage={20}
            >
              {getAllListings &&
                getAllListings.usersData.length > 0 &&
                getAllListings.usersData.map((value, key) => {
                  let viewListing = '/space/' + value.id + '/preview';
                  let editListing = '/become-a-host/' + value.id + '/home';
                  let isPublished = value.isPublished ? 'Yes' : 'No';
                  let isReady = value.isReady ? 'Yes' : 'No';
                  return (
                    <Tr key={key}>
                      <Td column={'ID'} data={value.id} />
                      <Td column={'Title'} data={value.title} />
                      <Td
                        column={'Host name'}
                        data={value.user.profile.firstName}
                      />
                      <Td column={'Host E-mail'} data={value.user.email} />
                      {!value.buildingName &&
                        value.street &&
                        value.city &&
                        value.country &&
                        value.zipcode && (
                          <Td
                            column={'Address'}
                            data={
                              value.street +
                              ', ' +
                              value.city +
                              ', ' +
                              value.country +
                              ', ' +
                              value.zipcode
                            }
                          />
                        )}
                      {value.buildingName &&
                        value.street &&
                        value.city &&
                        value.country &&
                        value.zipcode && (
                          <Td
                            column={'Address'}
                            data={
                              value.street +
                              ', ' +
                              value.buildingName +
                              ', ' +
                              value.city +
                              ', ' +
                              value.country +
                              ', ' +
                              value.zipcode
                            }
                          />
                        )}
                      <Td column={'City'} data={value.city} />
                      <Td column={'Country'} data={value.country} />
                      <Td
                        column={'Created Date'}
                        data={moment(value.createdAt).format('YYYY-MM-DD')}
                      />

                      <Td column="Partner">
                        <select name="isPartner" className={cx(s.formControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
                          onChange={(e) => this.handlePartnerChange(e, value.id, value.user.id)} value={value.isPartner}>
                          <option value={false}>{formatMessage(messages.no)}</option>
                          <option value={true}>{formatMessage(messages.yes)}</option>
                        </select>
                      </Td>

                      <Td column="Published">{isPublished}</Td>
                      <Td column="Ready">{isReady}</Td>

                      <Td column="Edit">
                        <a href={editListing}>Edit</a>
                      </Td>

                      <Td column="View">
                        <a href={viewListing}>View</a>
                      </Td>

                      <Td column="Delete">
                        <Confirm
                          onConfirm={() =>
                            this.deleteListing(value.id, 'admin')
                          }
                          body="Are you sure you want to delete this?"
                          confirmText="Confirm Delete"
                          title="Deleting Listing"
                        >
                          <a href="javascript:void(0)">Delete</a>
                        </Confirm>
                      </Td>
                    </Tr>
                  );
                })}
            </Table>
            {getAllListings &&
              getAllListings.usersData &&
              getAllListings.usersData.length > 0 && (
                <div>
                  <CustomPagination
                    total={getAllListings.count}
                    currentPage={currentPage}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    change={this.paginationData}
                    paginationLabel={'Lists'}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  removeListing,
  updateIsPartner
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(listingsQuery, {
    name: 'getAllListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
      },
      fetchPolicy: 'network-only',
    },
  }),
)(ListingManagement);