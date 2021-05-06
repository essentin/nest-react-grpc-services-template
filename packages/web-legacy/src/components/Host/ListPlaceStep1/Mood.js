// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Redux Form
import { Field, reduxForm, getFormSyncErrors, submit } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';

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
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';

// Helper
import update from './update';
import { isEmpty } from '../../../helpers/mergeObjects';


// Locale
import messages from '../../../locale/messages';

class Mood extends Component {

    static propTypes = {
        previousPage: PropTypes.any,
        nextPage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            moods: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { listingFields } = this.props;
        if (listingFields != undefined ) {
            this.setState({
                moods: listingFields.mood
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { listingFields } = nextProps;
        if (listingFields != undefined) {
            this.setState({
                moods: listingFields.mood
            });
        }
    }

    checkboxGroup = ({ options, input }) => (
        <ul className={s.listContainer}>
            {options.map((option, index) => {
                if (option.isEnable === "1") {
                    return (
                        <li className={s.listContentAmenities} key={index}>
                            <span className={s.checkBoxSection}>
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
                                <label className={cx(s.checkboxLabel, s.noPadding)}>{option.itemName}</label>
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
        const { moods } = this.state;

        return (
            <Grid fluid>
                <Row className={s.landingContainer}>
                    <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
                        <div>
                            <h3 className={s.landingContentTitle}>
                                <FormattedMessage {...messages.whatmoods} />
                            </h3>
                            <div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={cx(s.landingMainContent, s.spaceTop4, s.paddingTop2)}>
                                    <FormGroup className={s.formGroup}>
                                        <Field name="moods" component={this.checkboxGroup} options={moods} />
                                    </FormGroup>
                                </div>

                                <div className={s.nextPosition}>
                                    <div className={s.nextBackButton}>
                                        <hr className={s.horizontalLineThrough} />
                                        <FormGroup className={s.formGroup}>
                                            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                                <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("amenities")}>
                                                    <FormattedMessage {...messages.back} />
                                                </Button>

                                                <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("contact")}>
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

Mood = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: update
})(Mood);

const mapState = (state) => ({
    listingFields: state.listingFields.data,
    step1Errors: getFormSyncErrors('ListPlaceStep1')(state)
});

const mapDispatch = {
    submit
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Mood)));