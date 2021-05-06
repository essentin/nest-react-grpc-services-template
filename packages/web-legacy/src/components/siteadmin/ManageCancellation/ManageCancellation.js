import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import Link from '../../Link/Link';
import {
  Button
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageCancellation.css';

import { openCancelModal } from '../../../actions/siteadmin/modalActions';
import ModalForm from './ModalForm';

class ManageCancellation extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { data, title, openCancelModal } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <ModalForm />
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Button onClick={openCancelModal} className={cx(s.button, s.btnPrimary)}>
            Update Cancellation Info
					</Button>
          <div className={cx('table-responsive', 'popularlocationlist')}>
            <Table className="table"
              noDataText="No records found."
            >
              {
                data && data.map(function (value, key) {
                  return (
                    <Tr key={key}>
                      <Td column={"ID"} data={value.id} />
                      <Td column={"Policy Name"} data={value.policyName} />
                      <Td column="Edit">
                        <Link to={"/siteadmin/edit/cancellation/" + value.id}>
                          Edit
                              </Link>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  openCancelModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(ManageCancellation));



