import React, { Component } from "react";
import moment from "moment";
import "./styles/scss/PostList.css";


class PostList extends Component {
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClear = () => {
		this.setState({
			searchTag: ""
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		let foundPosts = this.props.posts.filter(post => {
			if(this.state){
			return post.tags.indexOf(this.state.searchTag) > -1;
		}else{
			return false
		}

		});
		this.props.filterPosts(foundPosts);
	};

	componentDidMount() {
		if (!this.props.posts.length) {
			this.props.createPostList();
		}
	}

	render() {
		const searchForm = this.refs.searchForm;
		let posts = null;

		if (this.props.posts.length) {
			posts = this.props.posts.filter(post => post.visible).map(post => {
				if (post.user_id === this.props.currentUser.id) {
					return (
						<div className="column is-one-quarter">
							<div className="card">
								<div className="card-image">
									<figure className="image">
										<img src={post.image_url} style={{ maxWidth: "100%" }} />
									</figure>
								</div>
								<div className="card-content">
									<div className="media">
										<div className="media-content">
											<p className="title is-4">{post.title}</p>
										</div>
									</div>
									<div className="content">
										{post.content}
										<br />
										<br />
										<i className="fas fa-map-pin" /> {post.address}
										<br />
										<br />
										<small>Posted {moment(post.created_at).fromNow()}
											<br/>by <span className="tag is-light is-rounded">@{post.username}</span>
										</small>
									</div>
								</div>
								<footer className="card-footer">
									<a
										onClick={() => {this.props.deletePost(post.id)}}
										className="card-footer-item">
										Delete
									</a>
								</footer>
							</div>
						</div>
					);
				} else {
						let claimLink = this.props.currentUser.points ?
				      (
							<a
								onClick={this.props.claimItem}
								id={post.id}
								className="card-footer-item">
								Claim
							</a>
						):(
							<p className="card-footer-item">No points left!</p>
						)
					return (
						<div className="column is-one-quarter">
							<div className="card">
								<div className="card-image">
									<figure className="image">
										<img src={post.image_url} style={{ maxWidth: "100%" }} />
									</figure>
								</div>
								<div className="card-content">
									<div className="media">
										<div className="media-content">
											<p className="title is-4">{post.title}</p>
										</div>
									</div>
									<div className="content">
										{post.content}
										<br />
										<br />
										<i className="fas fa-map-pin" /> {post.address}
										<br />
										<br />
										<small>Posted {moment(post.created_at).fromNow()}
												<br/>by <span className="tag is-light is-rounded">@{post.username}</span>
										</small>
									</div>
								</div>
								<footer className="card-footer">
									{claimLink}
								</footer>
							</div>
						</div>
					);
				}
			});
		} else {
			return (
				<div className="no-results hero is-centered">
					<div className="hero-content">
						<p>No results found 👀</p>
						<br />
						<button
							className="button is-outlined"
							onClick={this.props.resetPosts}>
							New Search
						</button>
					</div>
				</div>
			);
		}
		return (
				<div>
					<section className="hero is-light search-bar">
						<div className="hero-body has-text-centered">
							<div className="column is-expanded is-narrow">
								<div className="button-wrapper">
									<form onSubmit={this.handleFormSubmit} ref="searchForm">

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
									<br/>
								<div className="button-content">
									<button
										className="button is-white is-full-width"
										onClick={event => {
											this.props.resetPosts();
											this.props.clearSearchForm(searchForm);
											this.handleClear();
										}}>
										New Search
									</button>
								</div>
							</div>
					</div>
					</div>
					</section>
				<div className="container post-list">
					<div className="row columns is-multiline">{posts.reverse()}</div>
				</div>
			</div>
		);
	}
}

export default PostList;
