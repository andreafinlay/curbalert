import React, { Component } from "react";
import moment from "moment";
import Geocode from "react-geocode";
import "./styles/scss/App.css";
import "./styles/scss/PostModal.css";
import { Link } from "react-router-dom";

class PostModal extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		this.props.closeModal();
	};

	render() {
		let lat = this.props.modalParams.geo_tag.x;
		let lng = this.props.modalParams.geo_tag.y;

		let claimButton = this.props.currentUser.points ? (
			(claimButton =
				this.props.currentUser.id !== this.props.modalParams.user_id ? (
					<Link
						to="/profile"
						onClick={this.props.claimItem}
						id={this.props.modalParams.id}
						className="button is-warning">
						Claim Item
					</Link>
				) : (
					<button
						onClick={() => {
							this.props.deletePost(this.props.modalParams.id);
						}}
						className="button is-danger">
						Delete
					</button>
				))
		) : (
			<button className="button is-static is-outlined">No points left!</button>
		);

		return (
			<div
				className="modal post-modal is-active is-pulled-right"
				onClick={this.handleClick}>
				<div className="modal-content-width">
					<header className="modal-card-head">
						<p className="modal-card-title">{this.props.modalParams.title}</p>
						<button className="delete" onClick={this.handleClick} />
					</header>
					<section className="modal-card-body">
						<img
							src={this.props.modalParams.image_url}
							className="modal-image"
						/>
						<div className="content">{this.props.modalParams.content}</div>
						<div className="modal-address">
							<small>
								<i className="fas fa-map-pin" />{" "}
								{this.props.modalParams.address}
							</small>
						</div>
					</section>
					<footer className="modal-card-foot">
						{claimButton}
						<small className="is-size-7">
							Posted {moment(this.props.modalParams.created_at).fromNow()}
							<br />by @{this.props.modalParams.username}
						</small>
					</footer>
				</div>
			</div>
		);
	}
}

export default PostModal;
