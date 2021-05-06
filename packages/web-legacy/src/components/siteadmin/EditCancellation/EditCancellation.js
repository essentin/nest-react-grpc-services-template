import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditCancellation.css';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import Uploader from './Uploader/Uploader';
import Link from '../../Link';


class EditCancellation extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    data: []
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={label} type={type} className={className} />
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl
              {...input}
              className={className}
              componentClass="textarea"
              placeholder={label}
              rows={10}
            >
              {children}
            </FormControl>
          </Col>
        </Row>
      </FormGroup >
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { data } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'addpopular-autocomplete')}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText} >Image</label>
                    </Col>
                    <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                      <Uploader values={initialValues} />
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="policyName" type="text" component={this.renderFormControl} label={"Policy Name"} />
                <Field name="policyContent" type="text" component={this.renderFormControlTextArea} label={"Policy Content"} />
                <Field name="subTitle" type="text" component={this.renderFormControl} label={"Sub Title"} />
                <Field name="subContent" type="text" component={this.renderFormControlTextArea} label={"Detailed Content"} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Link to={'/siteadmin/cancellation/management'} className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.linkBtn)}>Cancel</Link>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
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

EditCancellation = reduxForm({
  form: 'EditCancellationForm', // a unique name for this form
  validate
})(EditCancellation);

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditCancellation)));



