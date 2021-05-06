import React, { Component } from 'react';

import moment from 'moment';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
    Row,
    Col,
    FormGroup,
} from 'react-bootstrap';
import cx from 'classnames';

import s from './Calendar.css';

import SingleDate from '../SingleDate';

import messages from '../../../locale/messages';

class ExtendDaysDateField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            setFocus: false
        };
        this.renderDate = this.renderDate.bind(this)
        this.handleSetFocus = this.handleSetFocus.bind(this)
    }

    handleSetFocus(setFocus) {
        this.setState({setFocus})
    }

    renderDate = ({ input, meta: { touched, error }, index }) => {
        const { formatMessage } = this.props.intl;
        const { blockedDates, maxDaysNotice, listId, activityType, closeToastar, blockedDays } = this.props;
        return (
            <div className={cx(s.starSize, 'calendarBorderBottom', 'calendarNoPaddingRight', 'calendarNoPaddingLeft', 'calendarSection')}>
                {touched && error && (
                    <span className={s.errorMessage}>{formatMessage(error)}</span>
                )}
                    <SingleDate
                        listId={listId}
                        formName={'BookingForm'}
                        name={input.name}
                        maxDaysNotice={maxDaysNotice}
                        index={index}
                        blockedDates={blockedDates}
                        activityType={activityType}
                        placeholder={formatMessage(messages.when)}
                        closeToastar={closeToastar}
                        blockedDays={blockedDays}
                    />
            </div>
        );
    };

    renderTimeRange = ({ fields }) => {

        return (
            <div>
                {fields.map((extendDay, index) => {
                    return (
                        <div key={index}>
                            <FormGroup className={s.noMargin}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <div>
                                                <Field
                                                    name={`${extendDay}.date`}
                                                    index={index}
                                                    component={this.renderDate}
                                                    className={cx(
                                                        'viewListingDate',
                                                        s.formControlInput,
                                                        s.jumboSelect,
                                                        s.formControlInputMaxWidth,
                                                    )}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                            </FormGroup>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { setFocus } = this.state;
        return (
            <div>
                <Field setFocus={setFocus} name="date" component={this.renderDate} />
            </div>
        );
    }
}

const selector = formValueSelector('BookingForm');

const mapState = (state) => ({
    isLoading: state.viewListing.isLoading,
    availability: state.viewListing.availability,
    maximumStay: state.viewListing.maximumStay,
    extendDay: selector(state, 'extendDay'),
    account: state.account.data,
    serviceFees: state.book.serviceFees,
    base: state.currency.base,
    rates: state.currency.rates,
    bookingLoading: state.book.bookingLoading,
    lookupIsLoading: state.viewListing.lookupIsLoading,
    lookupIndex: state.viewListing.lookupIndex,
});

const mapDispatch = {
    change,
};

export default injectIntl(
    withStyles(s)(connect(mapState, mapDispatch)(ExtendDaysDateField)),
);