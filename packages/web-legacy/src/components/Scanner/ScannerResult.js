import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ScannerModal.css';

import FailiurePage from './FailiurePage';
import SuccessPage from './SuccessPage';
import Loader from '../Loader';

import CheckForReservationQuery from './CheckForReservation.graphql';

import { closeScannerModal } from '../../actions/modalActions';

import messages from '../../locale/messages';

class ScannerResult extends Component {

  static propTypes = {
    data: PropTypes.shape({
      checkForReservation: PropTypes.shape({
        errorMessage: PropTypes.string,
        status: PropTypes.number.isRequired
      })
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render() {
    const { closeModal, checkForReservation: { loading, checkForReservation }, listId, clearResult } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {
          loading && <Loader show={loading} type={"page"}>
          </Loader>
        }
        {
          !loading && checkForReservation && checkForReservation.status === 200 &&
          !checkForReservation.errorMessage && <SuccessPage data={checkForReservation.result} closeModal={closeModal} />
        }
        {
          !loading && checkForReservation && checkForReservation.status === 200 &&
          checkForReservation.errorMessage && <FailiurePage closeModal={closeModal} type='noReservation' clearResult={clearResult} listId={listId}  />
        }
        {
          !loading && checkForReservation && checkForReservation.status !== 200 && <FailiurePage clearResult={clearResult} closeModal={closeModal} type='invalidQR' />
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  guestId: state.account.data.userId
});

const mapDispatch = {
  closeScannerModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(
    CheckForReservationQuery,
    {
      name: 'checkForReservation',
      options: ({ listId, guestId }) => ({
        variables: {
          listId,
          guestId
        },
        fetchPolicy: 'network-only',
      }),
    },
  )
)(ScannerResult);