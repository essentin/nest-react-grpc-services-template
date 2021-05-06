// General
import React from 'react';
import PropTypes from 'prop-types';

import { toastr } from 'react-redux-toastr'

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

// Components
import UserRegisterForm from '../../components/UserRegisterForm';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    refer: PropTypes.string
  };

  componentDidMount() {
    const { error_message } = this.props;
    error_message && toastr.error('Oops!', error_message);
  }

  render() {
    const { initialValues, step } = this.props;

    return <div><UserRegisterForm step={step} initialValues={initialValues} /> </div>;
  }
}

export default withStyles(s)(Register);