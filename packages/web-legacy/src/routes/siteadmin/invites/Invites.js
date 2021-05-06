import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Invites.css';

// Query
import invitesQuery from './inviteQuery.graphql';

// Component
import InviteManagement from '../../../components/siteadmin/InviteManagement';
import Loader from '../../../components/Loader';

class Invites extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    getAllInvites: PropTypes.shape({
      loading: PropTypes.bool,
      getAllInvites: PropTypes.array,
    })
  };

  static defaultProps = {
    getAllInvites: {
      loading: true
    }
  };

  render() {
    const { invitesQuery: { loading, getAllInvites }, title } = this.props;
    
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <InviteManagement title={title} data={getAllInvites} />;
    }
  }

}

export default compose(
  withStyles(s),
//   graphql(listingsQuery),
  graphql(invitesQuery, {
    name: 'invitesQuery',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only'
    }
  }),
)(Invites);
