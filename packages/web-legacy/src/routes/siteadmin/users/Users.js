import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Users.css';

// Component
import UserManagement from '../../../components/siteadmin/UserManagement';

class Users extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;
    return <UserManagement title={title} />;
  }

}

export default compose(withStyles(s))(Users);
