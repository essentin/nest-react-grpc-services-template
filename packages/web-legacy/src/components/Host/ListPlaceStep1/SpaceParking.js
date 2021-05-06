// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

//Redux Form
import { Field, reduxForm, change, formValueSelector } from 'redux-form';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Helpers
import validate from './validate';

// Internal Components
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';

import update from './update';

class SpaceParking extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    formErrors: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isParkingValue: true,
      parkingOptionList: []
    }
    this.setParking = this.setParking.bind(this);
  }

  componentDidMount() {
    const { formErrors, listingFields, isParking } = this.props;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        parkingOptionList: listingFields.parkingOptions
      });
    }
    this.setState({
      isParkingValue: isParking
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isParking, parkingDescription, parkingOptions, listingFields } = nextProps;


    this.setState({
      isDisabled: isParking ? ((!parkingDescription || parkingDescription.trim() === "" || parkingDescription.length < 35 || !parkingOptions || parkingOptions.length == 0) ? true : false) : false
     })
    if (listingFields != undefined) {
      this.setState({
        parkingOptionList: listingFields.parkingOptions
      });
    }
  }

  async setParking() {
    const { change } = this.props;
    const { isParkingValue } = this.state;

    await change('isParking', !isParkingValue);
    this.setState({
      isParkingValue: !isParkingValue
    });
  }

  checkboxGroup = ({ options, input, meta: { touched, error } }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div> {!touched && error && <span className={cx(s.errorMessage, s.errorRequired)}>{formatMessage(error)}</span>}
        <ul className={s.listContainer}>
          {options.map((option, index) => {
            if (option.isEnable === "1") {
              return (
                <li className={s.listContentAmenities} key={index}>
                  <span className={s.checkBoxSection}>
                    <CustomCheckbox
                      name={`${input.name}[${index}]`}
                      value={option.id}
                      className={'icheckbox_square-green'}
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
                    <label className={cx(s.checkboxLabel, s.noPadding)}>{option.itemName}</label>
                  </span>
                </li>
              )
            }
          }
          )
          }
        </ul>
      </div>
    );
  }

  renderSpaceSearch = ({
    input,
    meta: { touched, error },
    className,
    options
  }) => {
    const { formatMessage } = this.props.intl;
    let spaceValue = input.value ? input.value : 74;

    return <div>
      {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}

    </div>
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <FormControl
          {...input}
          className={className}
          placeholder={label}
          componentClass={"textarea"}
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  

  render() {
    const { handleSubmit, nextPage, previousPage } = this.props;
    const { isDisabled, isParkingValue, parkingOptionList } = this.state;
    const { formatMessage } = this.props.intl;
    
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <div>
              <form onSubmit={handleSubmit}>
                <h3 className={s.landingContentTitle}>
                  <FormattedMessage {...messages.describeoption} />
                </h3>
                <div>
                  <p className={cx(s.subContent, s.space3)}>
                    <FormattedMessage {...messages.describeoptionTerms1} />
                  </p>
                </div>
                <div className={s.space4}>
                  <Button className={cx(s.marginRight, s.btnlarge,
                    { [(s.btnPrimaryBorder, s.btnPrimary)]: isParkingValue })}
                    onClick={() => this.setParking()}>
                    <FormattedMessage {...messages.yesLabel} />
                  </Button>
                  <Button className={cx(s.btnlarge,
                    { [(s.btnPrimaryBorder, s.btnPrimary)]: !isParkingValue })}
                    onClick={() => this.setParking()}
                  >
                   <FormattedMessage {...messages.noLabel} />
                  </Button>
                </div>
                {isParkingValue && <div className={s.positionRelative}>
                  <div>
                    <p className={cx(s.subTextFontSize, s.space3, s.paddingTop1, s.marginParking)}>
                    <FormattedMessage {...messages.SelectAllApply} />
                    </p>
                  </div>
                  <div className={s.landingMainContent}>
                    <FormGroup className={s.formGroup}>
                      <Field name="parkingOptions" component={this.checkboxGroup} options={parkingOptionList} />
                    </FormGroup>
                    <div>
                      <p className={cx(s.subTextFontSize, s.space2)}>
                      <FormattedMessage {...messages.describeParkingOption} />
                    </p>
                    </div>
                    <FormGroup className={s.formGroup}>
                      <Field name="parkingDescription"
                        component={this.renderFormControlTextArea}
                        className={s.textareaInput}
                        label={formatMessage(messages.spaceParkingLabel)}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <span className={s.maximumCharcter}>
                      <FormattedMessage {...messages.parkingMinChar} />
                    </span>
                  </div>
                </div>
                }
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("location")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("amenities")} disabled={isDisabled}>
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

SpaceParking = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(SpaceParking);

const selector = formValueSelector('ListPlaceStep1');

const mapState = (state) => ({
  userData: state.account.data,
  formErrors: state.form.ListPlaceStep1,
  listingFields: state.listingFields.data,
  isParking: selector(state, 'isParking'),
  parkingOptions: selector(state, 'parkingOptions'),
  parkingDescription: selector(state, 'parkingDescription'),
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SpaceParking)));
