// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'react-apollo';
// Component
import StaticPageManagement from '../../../components/siteadmin/StaticPageManagement/StaticPageManagement';
import s from './StaticPage.css';

class StaticPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getBlogParentPage: PropTypes.any,
    }),
  };

  static defaultProps = {
    data: {
      loading: true,
    },
  };

  render() {
    const {
      data: { loading },
      title,
    } = this.props;

    return <StaticPageManagement title={title} />;
  }
}

export default compose(withStyles(s))(StaticPage);
