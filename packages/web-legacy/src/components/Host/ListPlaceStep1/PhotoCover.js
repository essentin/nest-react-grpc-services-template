import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector, submit, getFormSyncErrors } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import { isEmpty } from '../../../helpers/mergeObjects';

// Locale
import messages from '../../../locale/messages';

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

// Internal Components
import updateStep2 from './updateStep2';
import { toastr } from 'react-redux-toastr';

class PhotoCover extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    listPhotos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    coverPhoto: PropTypes.number
  };

  static defaultProps = {
    listPhotos: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  radioGroup = ({ label, name, options, input }) => (
    <ul className={cx(s.listContainer, 'customRatioButton')}>
      {options.map((option, index) => (
        <li className={s.listContent} key={index}>
          <span className={s.checkBoxSection}>
            <input
              type="radio"
              name={input.name}
              value={option.id}
              onChange={() => input.onChange(option.id)}
            />
          </span>
          <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
            <span className={cx(s.checkboxLabel, s.noPadding)}>
              <img
                src={'/images/upload/' + option.name}
                style={{ height: 100, width: 100 }}
                alt="images"
              />
            </span>
          </span>
        </li>))
      }
    </ul>
  );

  async handleSubmit() {
    const { submit } = this.props;
    const { step2Errors } = this.props;
    if (isEmpty(step2Errors)) {
      await submit('ListPlaceStep2');
    } else {
      toastr.error('Error!', 'It seems you have missed required fields. Please fill them.')
    }
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { listPhotos, listId, coverPhoto } = this.props;
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <div className={'customRatioButton'}>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.setCoverPhoto} /></h3>
              <div>
                <p className={s.subContent}>
                  <FormattedMessage {...messages.setCoverPhotoDesc} />
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <div className={cx('row')}>
                      {
                        listPhotos && listPhotos.map((option, index) => (
                          <div className={cx('col-lg-4 col-md-4 col-sm-6 col-xs-12')} key={index}>
                            <div className={s.listPhotoCover}>
                              <div>
                                <div
                                  className={s.coverImg}
                                  style={{ backgroundImage: `url(${'/images/upload/x_medium_' + option.name})` }}
                                />
                              </div>
                              <div className={s.coverPhotoSelection}>
                                <Field
                                  className={cx(s.coverPhotoCheckbox, s.radioSize)}
                                  type="radio"
                                  component="input"
                                  name="coverPhoto"
                                  value={option.id}
                                  checked={coverPhoto == option.id ? true : false}
                                />
                                <span className={s.coverText}><FormattedMessage {...messages.coverLabel} /></span>
                              </div>
                            </div>
                          </div>))
                      }
                    </div>
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("photos")}>
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
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

PhotoCover = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep2
})(PhotoCover);

const selector = formValueSelector('ListPlaceStep2'); // <-- same as form name
const mapState = (state) => ({
  coverPhoto: selector(state, 'coverPhoto'),
  listPhotos: state.location.listPhotos,
  step2Errors: getFormSyncErrors('ListPlaceStep2')(state),
});
const mapDispatch = {
  submit
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PhotoCover)))
