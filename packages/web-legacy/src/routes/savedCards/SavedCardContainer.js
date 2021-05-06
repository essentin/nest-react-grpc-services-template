import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SavedCardContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import { graphql, gql, compose } from 'react-apollo';
// Components
import SavedCards from '../../components/SavedCards/SavedCards';
import getCardDetails from './getCardDetails.graphql'

class SavedCardContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, getCardDetails } = this.props;

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(s.spaceTop4, s.landingContainer)}>
            <Col xs={12} sm={9} md={8} lg={8} className={s.smPadding}>
              <SavedCards
                data={getCardDetails.getCardDetails}
                loading={getCardDetails.loading}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default compose(
  withStyles(s),
  graphql(getCardDetails,
    {
      name: 'getCardDetails',
      options: (props) => ({
        fetchPolicy: 'network-only',
      })
    }
  ),
)(SavedCardContainer);