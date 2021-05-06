import React from 'react';

import {graphql, gql, compose} from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './UserInvitationSettings.css';

import UserInviteSettingsForm from '../../../components/siteadmin/UserInvitationSettingsForm/UserInvitationSettingsForm';
import Loader from '../../../components/Loader/Loader';

class ServiceFeesSettings extends React.Component {

  static defaultProps = {
    data: {
      loading: false
    }
  };

  render () {
    const { data: { loading, getUserInvitationSettings } } = this.props;
    const initialValues = { 
      maxInvites: getUserInvitationSettings && getUserInvitationSettings.result && getUserInvitationSettings.result.maxInvites
    };
    
    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <UserInviteSettingsForm initialValues={initialValues} />
    }
  }

}

export default compose(
    withStyles(s),
    graphql(gql`
    query GetUserInvitationSettings{
      getUserInvitationSettings {
        status
        result {
          maxInvites
        }
        errorMessage
      }
    }
    `)
)(ServiceFeesSettings);