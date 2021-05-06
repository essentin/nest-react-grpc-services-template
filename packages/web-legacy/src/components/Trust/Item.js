import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Image } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Trust.css';

import Loader from '../Loader';

import mail from '../../../public/NewIcon/gmail.png';
import document from './icons/correct.png';
import email from '../../../public/NewIcon/e-mail.png';
import facebook from '../../../public/NewIcon/facebook.jpg';
import linkedin from '../../../public/NewIcon/Linkedin.png';
import password from '../../../public/NewIcon/lock.svg';

class Item extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    handleClick: PropTypes.any,
    isAction: PropTypes.bool,
    buttonLabel: PropTypes.string,
    url: PropTypes.string,
    isLink: PropTypes.bool,
    show: PropTypes.bool,
  };
  render() {
    const {
      title,
      content,
      handleClick,
      isAction,
      buttonLabel,
      url,
      isLink,
      show,
      isImage,
    } = this.props;
    const { isEmailConfirmed, name } = this.props;
    let bgImage;
    if (name === 'email') {
      bgImage = email;
    } else if (name === 'facebook') {
      bgImage = facebook;
    } else if (name === 'google') {
      bgImage = mail;
    } else if (name === 'document') {
      bgImage = document;
    } else if (name === 'linkedin') {
      bgImage = linkedin;
    } else if (name === 'password') {
      bgImage = password;
    }
    return (
      <li className={s.listBorderBottom}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={s.displayGrid}>
              <div className={s.iconSection}>
                <span><Image src={bgImage} className={s.iconImages} /></span>
                <p className={s.descriptionScetion}>
                  <span className={s.titleSocial}>{title}</span>
                  <span className={s.description}>{`(${content})`}</span>
                </p>
              </div>
              <div className={s.btnScetion}>
                {isAction && isLink && (
                  <div className={s.btnPaddingTop}>
                    <a className={cx(s.button, s.btnPrimary)} href={url}>
                      {buttonLabel}
                    </a>
                  </div>
                )}
                {isAction && !isLink && (
                  <div className={s.btnPaddingTop}>
                    <Loader
                      type={'button'}
                      className={cx(s.button, s.btnPrimary)}
                      handleClick={handleClick}
                      show={show}
                      label={buttonLabel}
                      spinnerColor={'#f56e9f'}
                    />
                  </div>
                )}
                {isImage && (
                  <div className={s.btnPaddingTop}>
                    <Loader
                      type={'button'}
                      className={cx(s.button, s.btnverified)}
                      show={show}
                      label={'Verified'}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </li >
    );
  }
}
export default withStyles(s)(Item);