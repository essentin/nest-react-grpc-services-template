import React from 'react';

import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';

import s from './SelectCity.css';

import SiteIcon from '../../../public/SiteImages/group.svg';

import messages from '../../locale/messages';

class SelectCity extends React.Component {
  render() {
    return (
      <div>
        <div className={s.container}>
          <h1 className={s.SpacesWhereYouFlow}>
            <span className={'hidden-xs'}><FormattedMessage {...messages.spacesCreateFlow} /></span>
            {/* <span className={'visible-xs'}><img src={SiteIcon} className={s.siteImg} /></span> */}
          </h1>
          <div className={s.findWorkspace} >
            <span className={s.location}><FormattedMessage {...messages.findWorkspace} /></span>
            <span className={cx(s.btn, s.active)}> <FormattedMessage {...messages.stockholm} /> </span>
                           
          </div>
        </div>
        <div className={s.bgImg} style={{ backgroundImage: `url(${'/../../../images/home/curve.svg'})` }} />
      </div>
    );
  }
}

export default withStyles(s)(SelectCity);