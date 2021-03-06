import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from "../store/appContext.jsx";

class Modal extends React.Component{
	constructor(){
		super();
		this.state = {
				// Initialize your state
		};
	}
		
	render(){
		return (
			<div className="modal" tabIndex="-1" role="dialog" style={{display: (this.props.show) ? 'inline-block' : 'none'}}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Delete name?</h5>
							{ (this.props.onClose) ?
								<button onClick={() => this.props.onClose()} type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
									:''
							}
						</div>
						<div className="modal-body">
							<p>Are you sure you want to delete this BAMF?</p>
						</div>
						<Context.Consumer>
							{({ store, actions }) => {
							return (
								<div className="modal-footer">
									<button type="button" 
										className="btn btn-primary"
										onClick={ () => {
												this.props.onClose();
										}}>No, keep them!
									</button>
									<button type="button" 
										className="btn btn-secondary" 
										data-dismiss="modal"
										onClick={ () => {
											actions.deleteItem(this.props.deleteName);
											this.props.onClose();
										}}>Do it!
									</button>
								</div>
							);
						}}
						</Context.Consumer>
					</div>
				</div>
			</div>
		);
	}
		
}
/**
 * Define the data-types for
 * your component's properties
**/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	deleteName: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
**/
Modal.defaultProps = {
	show: false,
	onClose: null
};
export default withRouter(Modal);