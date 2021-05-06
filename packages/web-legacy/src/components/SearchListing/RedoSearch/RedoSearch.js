import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RedoSearch.css';

import { connect } from 'react-redux';

import { change } from 'redux-form';


class RedoSearch extends Component {

    render () {
        const { change } = this.props;
        change('SearchForm', 'searchByMap', true);
        return <div />;
    } 

}

const mapState = (state) => ({
});

const mapDispatch = {
    change
};

export default withStyles(s)(connect(mapState, mapDispatch)(RedoSearch));