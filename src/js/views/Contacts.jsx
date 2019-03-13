import React from "react";
import { Link } from "react-router-dom";

import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import { Context } from "../store/appContext.jsx";

export default class Contacts extends React.Component {
	constructor(){
		super();
		this.state = {
			showModal: false,
			toDelete: null
		};
	}

	render() {
	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">Add new contact</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">	
						<Context.Consumer>
							{
								({ store }) => {
									return store.contacts.map( (item, index) => {
										return <ContactCard 
											onDelete={() => this.setState({ showModal: true, toDelete: item.id})}
											id={item.id}
											contactName={item.full_name}
											contactAddress={item.address}
											contactPhone={item.phone}
											contactEmail={item.email}
											key={index}
											/>;
										});
								}
							}
						</Context.Consumer>
					</ul>
				</div>
			</div>
			<Modal show={this.state.showModal} deleteName={this.state.toDelete} onClose={() => this.setState({showModal: false})} />
		</div>
		);
	}
}
