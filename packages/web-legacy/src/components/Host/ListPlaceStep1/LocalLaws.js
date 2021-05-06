// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';
import { isEmpty } from '../../../helpers/mergeObjects';
import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Helpers
import validateStep3 from './validateStep3';

class LocalLaws extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    siteName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const { submit } = this.props;
    const { step3Errors } = this.props;
    if (isEmpty(step3Errors)) {
      await submit('ListPlaceStep3');
    } else {
      toastr.error('Error!', 'It seems you have missed required fields. Please fill them.')
    }
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    const { siteName } = this.props;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <h3 className={cx(s.landingContentTitle, s.space5)}><FormattedMessage {...messages.localLaws} /></h3>
            <form onSubmit={handleSubmit}>
              <div className={s.landingMainContent}>
                <p className={cx(s.textHigh, s.space3, s.spaceTop1)}>
                  <span>
                    <FormattedMessage {...messages.localLawsOne} />
                  </span>
                </p>
                <div className={cx(s.textLow, s.space5)}>
                  <p className={s.space3}>
                    <span>
                      <FormattedMessage {...messages.localLawsTwo} />
                    </span>
                  </p>
                  <p className={s.space3}>
                    <span>
                      <FormattedMessage {...messages.localLawsThree} />
                    </span>
                  </p>
                  <p className={s.space3}>
                    <span>
                      <FormattedMessage {...messages.localLawsFive} />{' '}{siteName}.{' '}<FormattedMessage {...messages.localLawsSix} />
                    </span>
                  </p>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsSeven} />
                    </span>
                  </p>
                </div>
              </div>
              <div className={s.nextPosition}>
                <div className={s.nextBackButton}>
                  <hr className={s.horizontalLineThrough} />
                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                      <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("activities")}>
                        <FormattedMessage {...messages.back} />
                      </Button>
                      <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={this.handleSubmit}>
                        <FormattedMessage {...messages.next} />
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

LocalLaws = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3
})(LocalLaws);

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  step3Errors: getFormSyncErrors('ListPlaceStep3')(state),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(LocalLaws)));