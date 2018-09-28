import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Post, SkeletonPost } from '../components';
import { http } from '../services';
import config from '../config';

export default class Home extends Component {

	state = {
		posts: []
	}

	componentDidMount() {
		http.get('posts').then(posts => {
			this.setState({ posts });
		});
	}

	render() {
		const { posts } = this.state;
		return (
			<React.Fragment>
				<header id="masthead" className="site-header" role="banner">
					<div className="title-block">
						<h1 className="site-title"><Link to="/" title={config.SITE_NAME} rel="home">{config.SITE_NAME}</Link></h1>
						<h3 className="site-description">{config.SITE_QUOTE}</h3>
					</div>
				</header>
				<div id="primary" className="content-area">
					<div id="content" className="site-content" role="main">
						{posts.length === 0 && <SkeletonPost count={5} />}
						{posts.map(post => <Post post={post} key={post.id} />)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
