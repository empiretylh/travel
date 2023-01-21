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
import { PersonAdd } from "react-bootstrap-icons";

import services from "../data/services";
import { TokenContext, LoadingContext } from "../context/Context";
import { useMutation } from "react-query";
import { IMAGE } from "../../assets/assets";

const Package = () => {
	

	return (
		<div className={"pages addadmin"}>
				<h4>Packages</h4>
		</div>
	);
};

export default Package;
