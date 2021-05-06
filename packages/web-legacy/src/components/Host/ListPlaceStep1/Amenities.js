// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Form
import { Field, reduxForm, getFormSyncErrors, submit } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';

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
  Col
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';


// image
import NoLogo from './noLogo1.jpg'

// Internal Components
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';

// Helpers
import update from './update';
import { isEmpty } from '../../../helpers/mergeObjects';

// Locale
import messages from '../../../locale/messages';


class Amenities extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      essentialsAmenities: [],
      safetyAmenities: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  checkboxGroup = ({ options, input }) => (
    <ul className={s.listContainer}>
      {options.map((option, index) => {
        if (option.isEnable === "1") {
          return (
            <li className={s.listContentAmenities} key={index}>
              <span className={cx(s.checkBoxSection, s.vtrTop)}>
                <CustomCheckbox
                  name={`${input.name}[${index}]`}
                  className={'icheckbox_square-green'}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={event => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}
                />
              </span>
              <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                <span className={cx(s.listIcon, s.aminitiesSectionImg)}>
                  {
                    option.itemDescription ?
                      <img src={'/images/amenities/' + option.itemDescription} className={s.imgSection} /> :
                      <img src={NoLogo} className={s.imgSection} />
                  }
                </span>
                <label className={cx(s.checkboxLabel, s.noPadding, s.aminitiesSection)}>{option.itemName}</label>
              </span>
            </li>
          )
        }
      })
      }
    </ul>
  );

  async handleSubmit() {
    const { submit } = this.props;
    const { step1Errors } = this.props;
    if (isEmpty(step1Errors)) {
      await submit('ListPlaceStep1');
    } else {
      toastr.error('Error!', 'It seems you have missed required fields. Please fill them.')
    }
  }

  render() {
    const { handleSubmit, previousPage, nextPage } = this.props;
    const { essentialsAmenities, safetyAmenities } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.whatamenities} />
              </h3>
              <div>
                <p className={s.subContent}>
                  <FormattedMessage {...messages.whatamenitiesTerms} />
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={cx(s.landingMainContent, s.spaceTop4, s.paddingTop2)}>
                  <FormGroup className={s.formGroup}>
                    <Field name="amenities" component={this.checkboxGroup} options={essentialsAmenities} />
                  </FormGroup>
                  <hr className={s.space4} />
                  <FormGroup className={s.formGroup}>
                    <label className={cx(s.landingLabel, s.landingSaftyTitle)}><FormattedMessage {...messages.safetyamenities} /></label>
                    <Field name="safetyAmenities" component={this.checkboxGroup} options={safetyAmenities} />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("spaces-parking")}>
                          <FormattedMessage {...messages.back} />
                        </Button>

                        <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("moods")}>
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
    )
  }
}

Amenities = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Amenities);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  step1Errors: getFormSyncErrors('ListPlaceStep1')(state)
});

const mapDispatch = {
  submit
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Amenities)));