import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Button } from 'react-bootstrap';

import messages from '../../locale/messages';
class Logout extends React.Component {

  static propTypes = {};

  render() {
    const { className } = this.props;
    return (
      <li className={className}>
        <form action="/logout" method="post">
          <Button type="submit" bsStyle="link">
            <span className={'logOutBtn'}><FormattedMessage {...messages.signout} /></span>
          </Button>
        </form>
      </li>
    );
  }

}

export default Logout;