// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux form
import { Field, reduxForm } from 'redux-form';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './UserInviteForm.css';
import {
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';

// Internal Helpers
import validate from './validate';
import submit from './submit';

class UserInviteForm extends Component {

  renderFormControl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label className={s.labelText}>
          {label}
        </label>
        <FormControl {...input} placeholder={placeholder} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting, usedInvitesCount, maxInviteCount } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.container}>
        <h2 className={cx(s.titleText, s.mainPadding)}>
          <FormattedMessage {...messages.inviteMembers} />
          <span className={s.countNumber}>{usedInvitesCount}/{maxInviteCount}</span>
        </h2>
        <hr className={s.horizontalLineThrough} />
        <form onSubmit={handleSubmit(submit)}>
          <FormGroup className={cx(s.noMargin, s.mainPadding)}>
            <Field
              name="invitedList"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.enterEmailAddresses)}
              className={cx(s.formControlInput, s.backgroundOne)}
            />
          </FormGroup>
          <hr className={s.horizontalLineThrough} />
          <FormGroup className={cx(s.noMargin, s.mainPadding)}>
            <Button className={cx(s.btnPrimary)} bsSize="large" block type="submit" disabled={submitting}>
              {formatMessage(messages.sendInvites)}
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }

}

UserInviteForm = reduxForm({
  form: 'UserInviteForm', // a unique name for this form
  validate
})(UserInviteForm);

const mapState = state => ({});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(UserInviteForm)));