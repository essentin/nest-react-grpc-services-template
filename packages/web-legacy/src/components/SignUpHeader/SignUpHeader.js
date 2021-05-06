import React from 'react'
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SignUpHeader.css';


//Images
import BgImage from '../../../public/NewIcon/curve.svg';
import siteImage from '../../../public/NewIcon/group.svg';

class SignUpHeader extends React.Component {
    render() {

        return (
            <div>
                <div>
                    <div className={s.logoSection}>
                        <img src={siteImage} className={s.logoImage} />
                    </div>
                    <div className={s.bgImage} style={{ backgroundImage: `url(${BgImage})` }} />
                </div>
            </div>
        )
    }
}


export default withStyles(s)(SignUpHeader);