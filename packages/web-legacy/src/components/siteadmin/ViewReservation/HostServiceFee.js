import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';
import moment from 'moment';
import CurrencyConverter from '../../CurrencyConverter';


class HostServiceFee extends Component {
    static propTypes = {
        hostId: PropTypes.string.isRequired,
        checkIn: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        loading: PropTypes.bool,
        reservationId: PropTypes.number,
        reservationState: PropTypes.string.isRequired,
        completed: PropTypes.bool,
        openReservationModal: PropTypes.any.isRequired,
        cancelData: PropTypes.shape({
            currency: PropTypes.string.isRequired,
        }),
    };

    static defaultProps = {
        loading: false,
        completed: false,
        reservationId: 0,
    };




    render() {
        const { checkIn, loading, reservationId, reservationState, completed, cancelData, hostServiceFee } = this.props;
        const { id, amount, currency } = this.props;

            return <span> <CurrencyConverter amount={hostServiceFee} from={currency} />  </span>

    }
}




export default withStyles(s)(HostServiceFee);
