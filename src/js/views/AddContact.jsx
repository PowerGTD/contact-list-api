import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import PropType from "prop-types";

export default class Contacts extends React.Component {
	constructor() {
		super();
		this.state = {
			contactName: "",
			contactAddress: "",
			contactPhone: "",
			contactEmail: ""
		};
	}
	
	addContact = () => {
		let errorFree = true;
		if (this.state.contactName.length < 3) {
			document.querySelector("#fullName").style.background = "red";
			errorFree = false;
		}
		if (this.state.contactAddress.length < 3) {
			document.querySelector("#fullAddress").style.background = "red";
			errorFree = false;
		}
		if (isNaN(this.state.contactPhone) || this.state.contactPhone.length < 7) {
			document.querySelector("#fullPhone").style.background = "red";
			errorFree = false;
		}
		if (!this.state.contactEmail.includes("@")) {
			document.querySelector("#fullEmail").style.background = "red";
			errorFree = false;
		}
		return errorFree;
	}
	
	populateContact = (actions) => {
		if (this.addContact() === true) {
			if (actions.addContact(this.state.contactName,
				this.state.contactEmail, this.state.contactPhone,
				this.state.contactAddress) === true) {
				this.props.history.push("/");	
			}
		}}
		
	loadData = () => {
		let urlIndex = window.location.href.slice(-1);
		if (urlIndex >= 0) {
			return this.props.match.params.theid;
		}
	}
	
	
	
	render() {
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					<Context.Consumer>
						{({ store, actions }) => {
							var contact = store.contacts[this.loadData()] || {};
							return (
								<form>
									<div className="form-group">
										<label>Full Name</label>
										<input 
											type="text" 
											className="form-control"
											id="fullName"
											placeholder={contact.name || "Full Name"}
											value={this.state.contactName}
											onChange={e => this.setState({ contactName: e.target.value })}
										/>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input 
											type="email" 
											className="form-control"
											id="fullEmail"
											placeholder={contact.email || "Enter email"}
											value={this.state.contactEmail}
											onChange={e => this.setState({ contactEmail: e.target.value })}
										/>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input 
											type="phone" 
											className="form-control"
											id="fullPhone"
											placeholder={contact.phone || "Enter phone"}
											value={this.state.contactPhone}
											onChange={e => this.setState({ contactPhone: e.target.value })}
										/>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input 
											type="text" 
											className="form-control" 
											id="fullAddress"
											placeholder={contact.address || "Enter address"} 
											value={this.state.contactAddress}
											onChange={e => this.setState({ contactAddress: e.target.value })}
										/>
									</div>
									<button type="button" 
												className="btn btn-primary form-control"
												onClick={ () => {
												this.populateContact(actions);
														}}>
															save
									</button>
									<Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
								</form>
							);
						}}
					</Context.Consumer>
				</div>
			</div>
		);
	}
}

Contacts.propTypes = {
	history: PropType.object,
	match: PropType.object
};