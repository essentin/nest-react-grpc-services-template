import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserInvitation.css';

// Query
import invitesQuery from './inviteQuery.graphql';

// Component
// import InviteManagement from '../../../components/siteadmin/InviteManagement/InviteManagement';
import Loader from '../../../components/Loader/Loader';

class Invites extends React.Component {

  static propTypes = {
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
    const { invitesQuery: { loading, getAllInvites } } = this.props;
    
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <div>afdkajdflk</div>;
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
