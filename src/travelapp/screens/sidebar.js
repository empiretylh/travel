import React, { useState,useContext } from "react";
import { Nav,Modal,Button, } from "react-bootstrap";
import "../main.css";
import Sidebar from "react-bootstrap-sidebar-menu";
import {CAContext,NavigationContext,TokenContext,IsAdminContext} from '../context/Context';

import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from "cdbreact";
import { Link as NavLink } from "react-router-dom";

import services from "../data/services";
import { IMAGE } from "../../assets/assets";

const SideBar = (props) => {
		

	const {isAdmin,setIsAdmin} = useContext(IsAdminContext);


	
 	 const { token, setToken } = useContext(TokenContext);

	const {is_clientview,setClietView} = useContext(CAContext);

	const {active,UpdateActive} = useContext(NavigationContext)
	const [showLogout,setShowLogout] = useState(false);
	return (
		<div
			className="sidebar"
			style={{
				display: "flex",
				height: "100vh",
				overflow: "scroll initial",
			}}
		>
		<Modal
				show={showLogout}
				onHide={() => setShowLogout(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					<h4 style={{ color: "red" }}>Logout</h4>
					<p
						style={{
							color: "red",
							fontSize: 20,
							fontFamily: "Roboto-Regular",
						}}
					>
						Are you sure want to Logout?
					</p>
					
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant={"danger"}
						onClick={(e) =>{
							 setIsAdmin(false);
							setToken(false);
							services.logout();

							window.location.href='#/home'
							setShowLogout(false);
						}}
					>
						Yes, Logout
					</Button>
						<Button
						variant={"primary"}
						onClick={(e) => setShowLogout(false)}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>

			<CDBSidebar textColor="#010101" backgroundColor="#f0f0f0">
				<CDBSidebarHeader
					style={{ padding: 0, margin: 0 }}
					prefix={<i className="fa fa-bars fa-large"></i>}
				>
					<img src={IMAGE.logo} style={{ width: "30px", height: "30px" }} />
					<a
						href="#/admin"
						className="text-decoration-none"
						style={{ color: "inherit", marginLeft: 5 }}
					>
						Admin
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu className="sidebar-menu">
						<NavLink to="/admin" onClick={() => UpdateActive("home")}>
							<CDBSidebarMenuItem
								icon="columns"
								iconSize="lg"
								className={
									active === "home"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}
							>
								Dashboard
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							to="/admin/packages"
							onClick={() => UpdateActive("packages")}
						>
							<CDBSidebarMenuItem
								icon="map"
								iconSize="lg"
								iconClassName={"salesicon"}
								className={
									active === "packages"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}
							>
								Packages
							</CDBSidebarMenuItem>
						</NavLink>

						<NavLink
							to="/admin/bookings"
							onClick={() => UpdateActive("bookings")}
						>
							<CDBSidebarMenuItem
								iconSize="lg"
								icon="book"
								className={
									active === "bookings"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}
							>
								Bookings
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							to="/admin/feedbacks"
							onClick={() => UpdateActive("feedbacks")}
						>
							<CDBSidebarMenuItem
								iconSize="lg"
								icon="comment"
								className={
									active === "feedbacks"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}
							>
								Feedbacks
							</CDBSidebarMenuItem>
						</NavLink>
						<div className="divider" />
						<NavLink
							to="/admin/addnewadmin"
							onClick={() => UpdateActive("admin")}
						>
							<CDBSidebarMenuItem
								iconSize="lg"
								icon="user-plus"
								className={
									active === "admin"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}
							>
								Add New Admin
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							to="/admin/changeinfo"
							onClick={() => UpdateActive("changeinfo")}
						>
							<CDBSidebarMenuItem
								iconSize="lg"
								icon="wallet"
								className={
									active === "changeinfo"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}
							>
								Change Information
							</CDBSidebarMenuItem>
						</NavLink>
						<div className="divider" />
						<NavLink
							to="/home"
							onClick={() => {UpdateActive("vas");}}
						>
							<CDBSidebarMenuItem
								iconSize="lg"
								icon="eye"
								className={
									active === "vas"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}


							>
								View as Client
							</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: "center" }}>
						<NavLink
							// to='home'
							onClick={() => {UpdateActive("logout");  setShowLogout(true)}}
						>
							<CDBSidebarMenuItem
								iconSize="lg"
								icon="user-times"
								className={
									active === "logout"
										? "sidebar-menu-item active"
										: "sidebar-menu-item"
								}


							>
								Logout
							</CDBSidebarMenuItem>
						</NavLink>
				</CDBSidebarFooter>
			</CDBSidebar>
		</div>
	);
};

export default SideBar;
