import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditCancellation.css';

// Component
import EditCancellation from '../../../components/siteadmin/EditCancellation/EditCancellation';

// Query
import getSpecificCancellation from './getSpecificCancellation.graphql';

class EditPopularLocation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
        }),
        cancellationId: PropTypes.number.isRequired
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading, getSpecificCancellation }, title } = this.props;
        return (
            <EditCancellation
                title={title} initialValues={getSpecificCancellation}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(getSpecificCancellation,
        {
            options: (props) => ({
                variables: {
                    cancellationId: props.cancellationId,
                },
                fetchPolicy: 'network-only'
            })
        })
)(EditPopularLocation);