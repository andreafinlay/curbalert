import React, { Component } from "react";
import "./styles/scss/SideBar.css";

class SideBar extends Component {
	constructor(props) {
		super(props);
		// this.handleChange = this.handleChange.bind(this);
		// this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			posts: this.props.posts
		};
	}

	handleChange(e) {
		// need to move this to action.js eventually
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	// handleFormSubmit(e) {
	// 	e.preventDefault();
	// 		this.props.getItem();
	// 	})
	// 	.catch(err => {
	// 		alert(err);
	// 	});
	// }

	componentWillReceiveProps(nextProps) {
		this.setState({ posts: nextProps.posts });
	}

	render() {
		let posts = null;
		if (this.state.posts.length) {
			posts = this.state.posts.map(post => {
				return (
					<li>
						<a href="#">
							{post.title}
							<img src={post.image_url} />
						</a>
					</li>
				);
			});
			return (
				<aside className="column is-fullheight">
					<a href="/posts" className="menu-label">
						<span className="allposts">
							<i className="trash-icon fa fa-trash" />
							All Posts
						</span>
					</a>
					<div className="column">
						<form onSubmit={this.handleFormSubmit}>
							<section className="modal-card-body">
								<br />
								<div className="field">
									<p className="control has-icons-left">
										<input
											className="input"
											type="email"
											placeholder="Search"
											name="email"
											onChange={this.handleChange}
										/>
										<span className="icon is-small is-left">
											<i className="fa fa-search" />
										</span>
									</p>
								</div>
								<button className="button is-light">Submit</button>
							</section>
						</form>
					</div>
					<ul className="menu-list">{posts}</ul>
				</aside>
			);
		} else {
			return <div>loading...</div>;
		}
	}
}

export default SideBar;
