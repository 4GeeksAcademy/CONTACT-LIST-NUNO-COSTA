import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	// useEffect (() => {actions.loadContacts}, [store.contacts])

	return (
		<>
			<div className="sticky-top mt-5 ms-5">

			</div>
			<div className="container">
				<ContactCard />
				<div className="container d-flex justify-content-center sticky-bottom">
					<Link to='/contactform'>
						<button type="button" className="btn btn-primary me-2 mt-2">Add a New Contact!</button>
					</Link>
					<button type="button" className="btn btn-primary me-2 mt-2" onClick={(e) => {
						e.preventDefault();
						actions.deleteAllContacts("Nuno")
					}}>Delete all contacts</button>
				</div>
			</div>
		</>
	);
};