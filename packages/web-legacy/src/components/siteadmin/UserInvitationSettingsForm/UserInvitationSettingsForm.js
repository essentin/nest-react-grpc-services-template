import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './UserInvitationSettingsForm.css';

import submit from './submit';
import validate from './validate';

import messages from '../../../locale/messages';

class UserInvitationSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{<FormattedMessage {...error} />}</span>}
            <FormControl {...input} placeholder={placeholder} type={type} className={className} />
          </Col>
        </Row>
      </FormGroup>
    );
  }

  render() {

    const { error, handleSubmit, submitting } = this.props;
    const title = <FormattedMessage {...messages.userInvitationSettingFormTitle}/>;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <Field name="maxInvites" type="text" component={this.renderFormControl} label={<FormattedMessage {...messages.maximumInvites}/>} placeholder={"eg: 10"} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >{messages.save.defaultMessage}</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

UserInvitationSettingsForm = reduxForm({
  form: 'UserInvitationSettingsForm', // a unique name for this form
  validate
})(UserInvitationSettingsForm);

export default withStyles(s)(UserInvitationSettingsForm);