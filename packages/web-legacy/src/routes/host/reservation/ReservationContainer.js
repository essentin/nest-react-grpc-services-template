import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ReservationContainer.css';

import Reservation from '../../../components/Host/Reservation/Reservation';
import NoItem from '../../../components/Host/Reservation/NoItem/NoItem';
import Loader from '../../../components/Loader/Loader';
import CustomPagination from '../../../components/CustomPagination/CustomPagination';

import messages from '../../../locale/messages';

import getAllReservationQuery from './getAllReservationQuery.graphql';

class ReservationContainer extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getAllReservation: PropTypes.shape({
        count: PropTypes.number,
        reservationData: PropTypes.array
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
    const { data: { loading, getAllReservation }, type } = this.props;
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.state;

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={s.landingContainer}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.smPadding}>
              {
                loading && <Loader type={"text"} />
              }
              {
                !loading && getAllReservation && getAllReservation.reservationData && getAllReservation.reservationData.length > 0 && <Reservation
                  reservations={getAllReservation.reservationData}
                  type={type}
                  currentPage={currentPage}
                />
              }
              {
                getAllReservation && getAllReservation.reservationData && getAllReservation.reservationData.length > 0 && <CustomPagination
                  total={getAllReservation.count}
                  currentPage={getAllReservation.currentPage}
                  defaultCurrent={1}
                  defaultPageSize={5}
                  change={this.paginationData}
                  paginationLabel={formatMessage(messages.panelReservation)}
                />
              }
              {
                !loading && getAllReservation && getAllReservation.reservationData && getAllReservation.reservationData.length === 0 && <NoItem
                  type={type}
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
          userType: 'host',
          dateFilter: props.type,
          currentPage: 1
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(ReservationContainer);