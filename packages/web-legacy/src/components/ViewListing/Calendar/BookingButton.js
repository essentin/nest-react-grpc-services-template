import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Button,
    FormGroup,
} from 'react-bootstrap';
import cx from 'classnames';

import s from './Calendar.css';

import Loader from '../../Loader';

import history from '../../../core/history';

import { openLoginModal } from '../../../actions/modalActions';
import { setPersonalizedValues } from '../../../actions/personalized';
import messages from '../../../locale/messages';

class BookingButton extends Component {
    static propTypes = {
        availability: PropTypes.bool.isRequired,
        isDateChosen: PropTypes.bool.isRequired,
        basePrice: PropTypes.number.isRequired,
        isHost: PropTypes.bool.isRequired,
        bookingProcess: PropTypes.any.isRequired,
        listId: PropTypes.number.isRequired,
        guests: PropTypes.number.isRequired,
        startDate: PropTypes.object,
        bookingType: PropTypes.string.isRequired,
        bookingLoading: PropTypes.bool,
        formatMessage: PropTypes.any,
        maximumStay: PropTypes.bool,
        userBanStatus: PropTypes.number,
    };
    static defaultProps = {
        availability: true,
        isDateChosen: false,
        bookingLoading: false
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.hanldeChange = this.hanldeChange.bind(this);
    }

    handleClick() {
        const { bookingProcess, listId, serviceFees, stripe, singleDay, bookedDate, selectedActivity, handleToolTips, openLoginModal, account, setPersonalizedValues } = this.props;
        const { basePrice, minHour, discount, isDisabled, extendDay, totalHours, activityId, maxGuest, activityType, isCleaningIncluded, cleaningFee } = this.props;
        if (!bookedDate || !selectedActivity || isDisabled) {
            handleToolTips({
                date: bookedDate ? false : true,
                space: selectedActivity ? false : true,
                time: !extendDay.some(obj => obj.startTime && obj.endTime)
            })
        } else if (!(account && account.userId)) {
            let date = moment(bookedDate).format('YYYY-MM-DD');
            let endDate = moment(date).add('days', 1).format('YYYY-MM-DD');
            let dates =  date && `'${date}' AND '${endDate}'`
            let query = history.location.search.split('?')[1].split('&')[0];
            let refer = `${history.location.pathname}?${query}&dates=${dates}`;
            refer = refer.indexOf('?') >= 0 ? refer.replace('?', '---') : refer;
            refer = refer.indexOf('&') >= 0 ? refer.replace('&', '--') : refer;
            history.push (`/login?refer=${refer}`)
        } else {
            bookingProcess(listId, basePrice, minHour, discount, extendDay, totalHours, null, null, activityId,
                maxGuest, activityType, isCleaningIncluded, cleaningFee, stripe, singleDay, bookedDate);
        }
    }
    hanldeChange() {
        history.push('/s');
    }
    render() {
        const { basePrice, userBanStatus, isDisabled, isDateChosen, availability, isHost, bookingType, bookingLoading } = this.props;
        const { formatMessage } = this.props.intl;
        const { account, bookedDate } = this.props;

        let disabled, buttonLabel;
        if (basePrice < 1 || isHost || userBanStatus) {
            disabled = true;
        } else {
            disabled = false;
        }
        if (bookingType === 'instant') {
            buttonLabel = messages.book;
        } else {
            buttonLabel = messages.requestToBook;
        }

        if (account && account.userType === 2) {
            disabled = true;
        }

        if (!availability && isDateChosen) {
            return (
                <div>
                    <FormGroup className={s.formGroup}>
                        <Button className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimaryBorder)} onClick={this.hanldeChange}>
                            <FormattedMessage {...messages.viewOtherListings} />
                        </Button>
                    </FormGroup>
                </div>
            );
        } else {
            return (
                <FormGroup className={cx(s.formGroup, s.spaceTop5)}>
                    <Loader
                        type={"button"}
                        className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimary)}
                        handleClick={this.handleClick}
                        disabled={disabled}
                        show={bookingLoading}
                        label={formatMessage(buttonLabel)}
                    />
                </FormGroup>
            );
        }
    }
}

const mapState = (state) => ({
    serviceFees: state.book.serviceFees,
    base: state.currency.base,
    rates: state.currency.rates,
    account: state.account.data
});

const mapDispatch = {
    openLoginModal,
    setPersonalizedValues
};

export default injectStripe(injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BookingButton))));