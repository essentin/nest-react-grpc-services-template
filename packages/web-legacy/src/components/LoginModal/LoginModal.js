// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LoginModal.css';
import { Modal } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeLoginModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import LoginForm from '../LoginForm';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class LoginModal extends Component {
  static propTypes = {
    closeLoginModal: PropTypes.func,
    loginModal: PropTypes.bool,
    formatMessage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModalStatus: false,
    };
  }

  componentDidMount() {
    const { loginModal } = this.props;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loginModal } = nextProps;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    } else {
      this.setState({ loginModalStatus: false });
    }
  }

  render() {
    const { closeLoginModal } = this.props;
    const { loginModalStatus } = this.state;
    let errorReturn = '/login?';

    if (errorReturn) {
      errorReturn = errorReturn.indexOf('?') >= 0 ? errorReturn.replace('?', '---') : errorReturn;
      errorReturn = errorReturn.indexOf('&') >= 0 ? errorReturn.replace('&', '--') : errorReturn;
    }

    return (
      <div>
        <Modal
          show={loginModalStatus}
          animation={false}
          onHide={closeLoginModal}
          dialogClassName={cx(s.logInModalContainer, 'loginModal', 'signupModal', 'NewSignUpModal')}
        >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.login} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <div className={s.mainPadding}>
                  <SocialLogin errorReturn={errorReturn} />
                </div>
                <strong className={s.lineThrough}>
                  <FormattedMessage {...messages.or} />
                </strong>
                <div>
                  <LoginForm />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  loginModal: state.modalStatus.isLoginModalOpen
});

const mapDispatch = { closeLoginModal };

export default withStyles(s)(connect(mapState, mapDispatch)(LoginModal));