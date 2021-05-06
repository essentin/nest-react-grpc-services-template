import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import {
  Button,
  Row, FormGroup,
  Col,
  FormControl,
  Grid
} from 'react-bootstrap';

import s from './Security.css';

import Trust from '../Trust';

import submit from './submit';
import validate from './validate';
import messages from '../../locale/messages';


class Security extends Component {

  constructor(props) {
    super(props)
  }

  renderFormControl = ({ input, placeholder, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.noMargin}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
            <FormControl {...input} placeholder={placeholder} type={type} className={cx(s.formControlInput, s.backgroundOne)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }
  render() {
    const { data: { loading, getUserVerifiedInfo }, error, handleSubmit, submitting } = this.props
    const { formatMessage } = this.props.intl;

    return <div className={cx(s.container, 'passwordSecurity')}>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={9}>
            <h2>{formatMessage(messages.security)}</h2>
            {!loading && <Trust data={getUserVerifiedInfo} />}
            <div>
              <div className={cx(s.scrollScetion, s.labelTitle)}>{formatMessage(messages.password)}<span className={s.pullRight}>{formatMessage(messages.options)}</span></div>
              
              <div className={s.scrollScetion}>
                <form onSubmit={handleSubmit(submit)}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div className={s.displayGrid}>
                        {error && <strong>{error}</strong>}
                        <div>
                          <Field name="newPassword" type="password" component={this.renderFormControl}
                            placeholder={formatMessage(messages.loginPassword)}  />
                        </div>
                        <FormGroup className={cx(s.noMargin, s.changePadding)}>
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignRight}>
                              <Button className={cx(s.button, s.btnPrimary)} type="submit" disabled={submitting}>
                                {formatMessage(messages.change)}
                              </Button> 
                            </Col>
                          </Row>
                        </FormGroup>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  }
}

Security = reduxForm({
  form: 'ChangePasswordForm', // a unique name for this form
  validate
})(Security);

const mapState = (state) => ({
  account: state.account.data
});

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState),
  graphql(gql`
        query ($userId: String!) {
          getUserVerifiedInfo (userId: $userId) {
            id
            isEmailConfirmed
            isFacebookConnected
            isGoogleConnected
            isIdVerification
            isLinkedinConnected
            status
          }
        }
      `,
    {
      options: (props) => ({
        variables: {
          userId: props.account.userId,
        },
        ssr: false,
      })
    }
  )
)(Security);