import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SavedCards.css';

// Component
import SavedCardsList from './SavedCardsList/SavedCardsList';
import EmptyList from './SavedCardsList/EmptyList';
import Loader from '../Loader/Loader';

class SavedCards extends Component {
  static defaultProps = {
    loading: true,
    data: []
  }

  constructor(props) {
    super(props);

    this.state = {
      initialLoad: true
    };
  }

  componentDidMount() {
    this.setState({
      initialLoad: false
    });
  }

  render() {
    const { data, loading } = this.props;
    const { initialLoad } = this.state;

    if (loading && initialLoad) {
      return <Loader type={"text"} />;
    } else {
      if (data != undefined && data.length > 0) {
        return (
          <div>
            <SavedCardsList data={data} />
          </div>
        );
      } else {
        return <EmptyList />;
      }
    }
  }
}

const mapState = (state) => ({

});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SavedCards));