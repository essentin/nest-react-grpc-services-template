import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageListing.css';

// Component
import PanelWrapper from '../../../components/Host/ManageListing/PanelWrapper/PanelWrapper';
import Loader from '../../../components/Loader/Loader';
// Graphql
import ManageListingsQuery from './manageListing.graphql';

class ManageListing extends React.Component {
  static propTypes = {
    ManageListingsData: PropTypes.shape({
      loading: PropTypes.bool,
      ManageListings: PropTypes.array
    })
  };

  static defaultProps = {
    ManageListingsData: {
      loading: true,
      ManageListings: []
    }
  }

  render() {
    const { ManageListingsData: { loading, ManageListings } } = this.props;

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={s.landingContainer}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.smPadding}>
              {
                loading && <Loader type={"text"} />
              }
              {
                !loading && ManageListings != null && <PanelWrapper data={ManageListings} />
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default compose(
  withStyles(s),
  graphql(ManageListingsQuery, {
    name: 'ManageListingsData',
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  }),
)(ManageListing);