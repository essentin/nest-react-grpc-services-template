// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookingModal.css';

// Redux
import { connect } from 'react-redux';
import { closeBookingModal } from '../../../actions/BookingModal/modalActions';

import Calendar from '../Calendar';
import CardForm from '../../CardForm';
import { Elements } from 'react-stripe-elements';

class BookingModal extends Component {
    static propTypes = {
        closeLoginModal: PropTypes.func,
        loginModal: PropTypes.bool,
        formatMessage: PropTypes.func,
    };

    static defaultProps = {
        loading: true
    };

    constructor(props) {
        super(props);
        this.state = {
            bookingModalStatus: false,
        };
    }

    componentDidMount() {
        const { bookingModal } = this.props;
        if (bookingModal === true) {
            this.setState({ bookingModalStatus: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { bookingModal } = nextProps;
        if (bookingModal === true) {
            this.setState({ bookingModalStatus: true });
        } else {
            this.setState({ bookingModalStatus: false });
        }
    }

    render() {
        const { viewListCardStatus, account, title, blockedDays } = this.props;
        const { bookingModalStatus } = this.state;
        const { id, loading, blockedDates, activityData, isFrom } = this.props;
        const { listingData, isHost, bookingType, reviewsCount, reviewsStarRating, activityId, activityType } = this.props;
        return (
            <div className={'bookingModalDiolog'}>
                {
                    bookingModalStatus &&
                    <div>
                        {account && viewListCardStatus && <div>
                            <Elements>
                                <CardForm
                                    listId={id}
                                    activityId={activityId}
                                    activityType={activityType}
                                    activityData={activityData}
                                    page={'viewListing'} />
                            </Elements>
                        </div>}
                        {!viewListCardStatus && <Calendar
                            id={id}
                            loading={loading}
                            blockedDates={blockedDates || undefined}
                            activityData={activityData}
                            listingData={listingData || undefined}
                            isHost={isHost}
                            bookingType={bookingType}
                            reviewsCount={reviewsCount}
                            reviewsStarRating={reviewsStarRating}
                            activityId={activityId}
                            activityType={activityType}
                            title={title}
                            blockedDays={blockedDays}
                        />}
                    </div>
                }
            </div>
        );
    }
}


const mapState = state => ({
    bookingModal: state.modalStatus.bookingModal,
    viewListCardStatus: state.modalStatus.viewListCardModalStatus,
    account: state.account.data,
});

const mapDispatch = {
    closeBookingModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(BookingModal));