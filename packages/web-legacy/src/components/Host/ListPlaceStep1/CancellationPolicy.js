// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Helpers
import validateStep3 from './validateStep3';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import SyncCalendar from './SyncCalendar/SyncCalendar';

import updateStep3 from './updateStep3';

const getAllCancellation = gql`
query getAllCancellation{
  getAllCancellation {
    id
    policyName
    policyContent
    
  }
}
`;
class CancellationPolicy extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    listingSteps: PropTypes.shape({
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        isPublished: PropTypes.bool.isRequired
      })
    }),
  };

  static defaultProps = {
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
  };
  renderField = ({ input, type, checked }) => (
    
    <input {...input} type={type} checked={checked} />
    
  );
  render() {
    const { handleSubmit, previousPage, nextPage, listId, getAllCancellation,cancellationPolicyId } = this.props;
    const { listingSteps } = this.props;
    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, 'customRatioButton')}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.chooseCancellationPolicy} />
              </h3>
              <div>
                <p className={s.subContent}>
                  <FormattedMessage {...messages.chooseCancellationPolicyDesc} />
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={cx(s.formGroup, s.spaceTop4)}>
                    <div>
                      <div>
                        {
                          getAllCancellation && getAllCancellation.getAllCancellation && getAllCancellation.getAllCancellation.map((item, index) => {
                            return (
                              <div key={index}>
                                <label className={cx(s.landingLabel, s.displayInlineblock)}>
                                  <Field
                                    name="cancellationPolicy"
                                    component={this.renderField}
                                    type="radio"
                                    value={item.id}
                                    checked={cancellationPolicyId == item.id? true: false}
                                    
                                  />
                                  <span className={cx(s.fontWeight, s.vtrMiddle, s.cancelPolicyText)}>
                                    {
                                      item.policyName
                                    }
                                  </span>
                                </label>
                                <div className={s.space4}>
                                  <p className={cx(s.fontSize2, s.textPrimaryColor, s.lineHeight1)}>
                                    {
                                      item.policyContent
                                    }
                                  </p>
                                </div>
                              </div>
                            )
                          })
                        }
                        
                      </div>
                    </div>
                  </FormGroup>

                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("calendar")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("activities")}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

CancellationPolicy = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3,
  
})(CancellationPolicy);
const selector = formValueSelector('ListPlaceStep3')
const mapState = (state) => ({
  listingFields: state.listingFields.data,
  listingSteps: state.location.listingSteps,
  cancellationPolicyId: selector(state, 'cancellationPolicy')
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getAllCancellation, {
    name: 'getAllCancellation',
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  }))(CancellationPolicy);
