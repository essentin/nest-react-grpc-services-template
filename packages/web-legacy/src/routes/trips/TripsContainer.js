import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TripsContainer.css';
import cx from 'classnames';

// Graphql
import getAllReservationQuery from './getAllReservationQuery.graphql';

// Component
import Reservation from '../../components/Reservation/Reservation';
import Loader from '../../components/Loader';

class TripsContainer extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getAllReservation: PropTypes.shape({
        count: PropTypes.number,
        bookingHistoryData: PropTypes.array
      }),
      refetch: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.paginationData = this.paginationData.bind(this);
  }

  paginationData(currentPage) {
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  render() {
    const { data: { loading, getAllReservation } } = this.props;

    return (
      <div className={cx(s.container, 'manageListingPanel')}>
        <Grid fluid>
          <Row className={s.landingContainer}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.smPadding}>
              {
                loading && <Loader type={"text"} />
              }
              {
                !loading && getAllReservation && <Reservation
                  bookingHistoryData={getAllReservation.bookingHistoryData}
                  upcomingBookingData={getAllReservation.upcomingBookingData}
                  cancelledBookingData={getAllReservation.cancelledBookingData}
                />
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(getAllReservationQuery,
    {
      options: (props) => ({
        variables: {
          userType: 'guest',
          isFrom: 'viewBooking'
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(TripsContainer);