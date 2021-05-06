import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
	Button,
	Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as FontAwesome from 'react-icons/lib/fa';

import s from './SideBar.css';

import Link from '../../Link';

import { validatePrivilege } from '../../../helpers/adminPrivileges';

class SideBar extends Component {

	static defaultProps = {
		isSuperAdmin: false,
		privileges: []
	};

	constructor(props) {
		super(props);
		this.state = {
			step1: false,
			step3: false,
			home: false,
		};
	}

	render() {
		const { isSuperAdmin, privileges } = this.props;

		return (
			<div className={cx(s.sidebarWrapper, "hidden-print")}>
				<div className={cx(s.sideBarWelcome)}>
					<span>Welcome, Admin</span>
				</div>
				<ul className={s.sidebarNav}>
					{
						isSuperAdmin && <li>
							<Button
								bsStyle="link"
								className={cx(s.button, s.noPadding)}
								onClick={() => this.setState({
									subAdmin: !this.state.subAdmin
								})}>
								<FontAwesome.FaStar className={s.navigationIcon} />
								<span>Manage Admins</span>
								{
									this.state.subAdmin && <FontAwesome.FaAngleUp className={s.navigationIcon} />
								}

								{
									!this.state.subAdmin && <FontAwesome.FaAngleDown className={s.navigationIcon} />
								}

							</Button>
							<Collapse in={this.state.subAdmin} className={s.subMenu}>
								<div>
									<Link to={"/siteadmin/admin-users"}>
										<FontAwesome.FaCircleThin className={s.navigationIcon} />
										<span>Manage Admin Users</span>
									</Link>

									<Link to={"/siteadmin/admin-roles"}>
										<FontAwesome.FaCircleThin className={s.navigationIcon} />
										<span>Manage Admin Roles</span>
									</Link>
								</div>
							</Collapse>
						</li>
					}

					{
						<li>
							<Link to={"/siteadmin/invites"}>
								<FontAwesome.FaUser className={s.navigationIcon} />
								<span>Manage Invites</span>
							</Link>
						</li>
					}

					{
						validatePrivilege(2, privileges) && <li>
							<Link to={"/siteadmin/users"}>
								<FontAwesome.FaUser className={s.navigationIcon} />
								<span>Manage Users</span>
							</Link>
						</li>
					}

					{
						validatePrivilege(3, privileges) && <li>
							<Link to={"/siteadmin/listings"}>
								<FontAwesome.FaList className={s.navigationIcon} />
								<span>Manage Listings</span>
							</Link>
						</li>
					}

					{
						validatePrivilege(4, privileges) && <li>
							<Link to={"/siteadmin/reservations"}>
								<FontAwesome.FaPlane className={s.navigationIcon} />
								<span>Manage Reservations</span>
							</Link>
						</li>
					}

					<li>
						<Link to={"/siteadmin/change/admin"}>
							<FontAwesome.FaCogs className={s.navigationIcon} />
							<span>Change Password</span>
						</Link>
					</li>

					{
						validatePrivilege(14, privileges) && <li>
							<Button
								bsStyle="link"
								className={cx(s.button, s.noPadding)}
								onClick={() => this.setState({
									step1: !this.state.step1
								})}>
								<FontAwesome.FaSliders className={s.navigationIcon} />
								<span>List Settings for Step#1</span>
								{
									this.state.step1 && <FontAwesome.FaAngleUp className={s.navigationIcon} />
								}

								{
									!this.state.step1 && <FontAwesome.FaAngleDown className={s.navigationIcon} />
								}
							</Button>
							<Collapse in={this.state.step1} className={s.subMenu}>
								<div>
									<Link to={"/siteadmin/listsettings/10"}>
										<FontAwesome.FaCircleThin className={s.navigationIcon} />
										<span>Essential Amenities</span>
									</Link>
									<Link to={"/siteadmin/listsettings/11"}>
										<FontAwesome.FaCircleThin className={s.navigationIcon} />
										<span>Safety Amenities</span>
									</Link>
									<Link to={"/siteadmin/listsettings/12"}>
										<FontAwesome.FaCircleThin className={s.navigationIcon} />
										<span>Parking Options</span>
									</Link>
									<Link to={"/siteadmin/listsettings/20"}>
										<FontAwesome.FaCircleThin className={s.navigationIcon} />
										<span>Mood</span>
									</Link>
								</div>
							</Collapse>
						</li>
					}

					{
						validatePrivilege(15, privileges) && <li>
							<Link to={"/siteadmin/staticpage/management"}>
								<FontAwesome.FaList className={s.navigationIcon} />
								<span>Static Content Management</span>
							</Link>
						</li>
					}

					{
						validatePrivilege(16, privileges) && <li>
							<Link to={"/siteadmin/settings/user-invitation"}>
								<FontAwesome.FaSliders className={s.navigationIcon} />
								<span>User Invites Settings</span>
							</Link>
						</li>
					}

					{/* {
						validatePrivilege(16, privileges) && <li>
							<Link to={"/siteadmin/user-invitation"}>
								<FontAwesome.FaSliders className={s.navigationIcon} />
								<span>User Invites Management</span>
							</Link>
						</li>
					} */}


				</ul>
			</div>
		)
	}
}

const mapState = (state) => ({
	isSuperAdmin: state.runtime.isSuperAdmin,
	privileges: state.adminPrevileges.privileges && state.adminPrevileges.privileges.privileges
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SideBar));