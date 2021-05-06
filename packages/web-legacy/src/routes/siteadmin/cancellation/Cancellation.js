import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Component
import ManageCancellation from '../../../components/siteadmin/ManageCancellation/ManageCancellation';
import getAllCancellation from './getAllCancellation.graphql';


class Cancellation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllCancellation: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;
        const { data: { getAllCancellation } } = this.props;

        return (
            <ManageCancellation
                title={title}
                data={getAllCancellation}
            />
        );
    }
}


export default compose(
    withStyles(s),
    graphql(getAllCancellation,
        {
            options: {
                fetchPolicy: 'network-only',
                ssr: false
            }
        }),
)(Cancellation);