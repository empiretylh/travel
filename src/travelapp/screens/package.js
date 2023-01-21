import React, { useState, useContext, useRef } from "react";
import {
	Col,
	Row,
	Container,
	Table,
	Form,
	InputGroup,
	Button,
	Modal,
} from "react-bootstrap";
import { PersonAdd, Search } from "react-bootstrap-icons";

import services from "../data/services";
import { TokenContext, LoadingContext } from "../context/Context";
import { useMutation } from "react-query";
import { IMAGE } from "../../assets/assets";

const Package = () => {
	return (
		<div className={"pages"}>
			<div style={{ display:'flex',justifyContent:'center',alignItems:'center',padding: 10,backgroundColor: 'red' }}>
				<InputGroup style={{width: 500}}>
					<Form.Control
						type="text"
						placeholder="Search Packages"
						className="searchfield"
					/>
					<Button>
						<Search size={20} style={{ marginLeft: 3 }} />
					</Button>
				</InputGroup>
			</div>
			<div>
				<h1>Add New Package</h1>
				<Button variant='primary'>Add New Package</Button>
			</div>
		</div>
	);
};

export default Package;
