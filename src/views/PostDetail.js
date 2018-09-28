import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../services';

export default class PostDetail extends Component {

	state = {
		title: '',
		content: ''
	};

	componentDidMount() {
		const slug = this.props.match.params.slug;
		http.get('posts?slug=' + slug).then(post => {
			this.setState({
				title: post[0].title.rendered,
				content: post[0].content.rendered
			});
		});
	}

	render() {
		const { title, content } = this.state;
		return (
			<React.Fragment>
				<header id="masthead" className="site-header" role="banner">
					<div className="title-block">
						<div className="entry-meta">
							<span className="posted-on">Posted on <a><time className="entry-date published">April 1, 2018</time><time className="updated">September 26, 2018</time></a></span>
							<span className="byline"> by <span className="author vcard"><a className="url fn n">andriyandriyan</a></span></span>
						</div>
						<h1>{title}</h1>
					</div>
				</header>
				<div id="primary" className="content-area">
					<div id="content" className="site-content" role="main">
						<article id="post-190" className="post-190 post type-post status-publish format-standard hentry category-ionic tag-firebase tag-ionic tag-login tag-register libretto-long-form">
							<div className="entry-content">{content}</div>
							<footer className="entry-meta">
								<span className="cat-links">Posted in <a href="https://andriyandriyan.com/category/ionic" rel="category tag">Ionic</a></span><span className="tags-links">Tagged <a href="https://andriyandriyan.com/tag/firebase" rel="tag">Firebase</a>, <a href="https://andriyandriyan.com/tag/ionic" rel="tag">Ionic</a>, <a href="https://andriyandriyan.com/tag/login" rel="tag">Login</a>, <a href="https://andriyandriyan.com/tag/register" rel="tag">Register</a></span>
							</footer>
						</article>
						<nav role="navigation" id="nav-below" className="navigation-post">
							<h1 className="screen-reader-text">Post navigation</h1>
							<div className="previous">
								<a rel="prev"><span className="meta-nav">Previous Article</span> Membuat Grafik Di PHP-MySQL Menggunakan Chartjs</a>
							</div>
							<div className="next">
							</div>
						</nav>
					</div>
				</div>
			</React.Fragment>
		);
	}

}
