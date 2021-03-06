import React, { Component } from "react";
import SideBarItem from "./SideBarItem.jsx";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
import "./styles/scss/SideBar.css";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			latitude: Infinity,
			longitude: Infinity
		};
	}

	isInBounds = post => {
		if(this.props.currentBounds){
		let x = post.geo_tag.x;
		let y = post.geo_tag.y;
		let upperX = this.props.currentBounds.ne.lat;
		let lowerX = this.props.currentBounds.se.lat;
		let upperY = this.props.currentBounds.ne.lng;
		let lowerY = this.props.currentBounds.nw.lng;
		if (x <= upperX && x >= lowerX && y <= upperY && y >= lowerY) {
			return true;
		} else {
			return false;
		}
	}
	return true;
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleDropdown = recenterAddress => {
		this.setState({ recenterAddress });
	};

	handleSelect = recenterAddress => {
		geocodeByAddress(recenterAddress)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.centerZoom(latLng.lat, latLng.lng, 11))
			.then(() => this.setState({ recenterAddress: "" }))
			.catch(error => console.error("Error", error));
	};

	handleClear = () => {
		this.setState({
			searchTag: "",
			recenterLocation: ""
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		let foundPosts = this.props.posts.filter(post => {
			if (post.tags) {
				return post.tags.indexOf(this.state.searchTag) > -1;
			} else {
				return false;
			}
		});
		this.props.filterPosts(foundPosts);
	};

	toggleModal = key => {
		let thisPost = null;
		this.props.posts.forEach((post, i) => {
			if (post.id == key) {
				thisPost = post;
			}
		});
		this.props.showModal(thisPost);
	};

	hoverState = key => {
		let thisPost = null;
		this.props.posts.forEach((post, i) => {
			if (post.id == key) {
				thisPost = post;
			}
		});
		this.props.hoverMarker(thisPost);
	};

	clearHoverState = () => {
		this.props.clearHover();
	};

	render() {
		const searchForm = this.refs.searchForm;
		const recenterForm = this.refs.recenterForm;

		let posts = null;
		if (this.props.posts.length) {
			posts = this.props.posts
				.filter(post => post.visible && this.isInBounds(post))
				.map(post => {
					return (
						<SideBarItem
							id={post.id}
							title={post.title}
							image={post.image_url}
							created_at={post.created_at}
							geo_tag={post.geo_tag}
							toggleModal={this.toggleModal}
							hoverState={this.hoverState}
							clearHoverState={this.clearHoverState}
							centerZoom={this.props.centerZoom}
							address={post.address}
							post={post}
						/>
					);
				});

			return (
				<aside className="menu column is-fullheight has-shadow s">
					<div
						className="column"
						style={{ paddingBottom: "0", marginTop: "8px" }}>
						<form onSubmit={this.handleRecenterSubmit} ref="recenterForm">
							<div className="field">
								<p className="control has-icons-left">
									<PlacesAutocomplete
										value={this.state.recenterAddress}
										onChange={this.handleDropdown}
										onSelect={this.handleSelect}>
										{({
											getInputProps,
											suggestions,
											getSuggestionItemProps
										}) => (
											<div>
												<input
													{...getInputProps({
														placeholder: "Search Places ...",
														className: "location-search-input"
													})}
													style={{ width: "100%" }}
													className="input"
													placeholder="Change your location"
												/>
												<div className="autocomplete-dropdown-container">
													{suggestions.map(suggestion => {
														const className = suggestion.active
															? "suggestion-item--active"
															: "suggestion-item";
														const style = suggestion.active
															? {
																	backgroundColor: "#fafafa",
																	cursor: "pointer"
															  }
															: {
																	backgroundColor: "#ffffff",
																	cursor: "pointer"
															  };
														return (
															<div
																{...getSuggestionItemProps(suggestion, {
																	className,
																	style
																})}>
																<span>{suggestion.description}</span>
															</div>
														);
													})}
												</div>
											</div>
										)}
									</PlacesAutocomplete>
									<span className="icon is-small is-left">
										<i className="fa fa-map" />
									</span>
								</p>
							</div>
						</form>
						<div className="button-wrapper">
							<form
								onSubmit={this.handleFormSubmit}
								ref="searchForm"
								style={{ marginBottom: "10px" }}>
								<hr style={{ margin: "1.2em" }} />
								<div className="field has-addons">
									<div className="control is-expanded">
										<input
											className="input search-input"
											type="search"
											placeholder="I'm looking for..."
											name="searchTag"
											onChange={this.handleChange}
										/>
									</div>
									<div className="control">
										<button className="button is-success">
											<i className="fa fa-search" />
										</button>
									</div>
								</div>
							</form>
							<div className="button-content">
								<button
									style={{ width: "100%" }}
									className="button is-outlined is-extended newButton"
									onClick={() => {
										this.props.clearSearchForm(searchForm);
										this.props.createPostList();
										this.handleClear();
									}}>
									New Search
								</button>
							</div>
						</div>
					</div>
					<hr style={{ margin: "1em" }} />
					<p className="menu-label" style={{ textAlign: "center" }}>
						Posts In Your Area
					</p>
					{posts.reverse()}
				</aside>
			);
		} else {
			return (
				<div style={{ margin: "30px" }}>
					<p>No results found 👀</p>
					<br />
					<button
						style={{ width: "100%" }}
						className="button is-outlined"
						onClick={this.props.resetPosts}>
						New Search
					</button>
				</div>
			);
		}
	}
}

export default SideBar;
