import React, { Component } from 'react';
import moment from 'moment';
import { http } from '../services';
import loader from '../assets/images/loader.svg';
import config from '../config';

export default class PostDetail extends Component {

	state = {
		title: '',
		content: '',
		loading: false
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		const slug = this.props.match.params.slug;
		this.setState({ loading: true });
		http.get('posts?slug=' + slug).then(post => {
			document.title = post[0].title.rendered + ' - ' + config.SITE_NAME;
			this.setState({
				title: post[0].title.rendered,
				posted: post[0].date,
				content: post[0].content.rendered,
				loading: false
			});
		});
	}

	createMarkup(html) {
		return { __html: html };
	}

	renderLoading() {
		const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		const style = {
			display: 'flex',
			height: windowHeight,
			justifyContent: 'center'
		};
		return (
			<div style={style}>
				<img src={loader} alt="loader" />
			</div>
		);
	}

	render() {
		const { title, content, loading } = this.state;

		if (loading) {
			return this.renderLoading();
		}

		if (!loading) {
			const posted = moment(this.state.posted).format('D MMM YYYY');
			return (
				<React.Fragment>
					<header id="masthead" className="site-header" role="banner">
						<div className="title-block">
							<div className="entry-meta">
								<span className="posted-on">Posted on <a><time className="entry-date published">{posted}</time><time className="updated">September 26, 2018</time></a></span>
								<span className="byline"> by <span className="author vcard"><a className="url fn n">andriyandriyan</a></span></span>
							</div>
							<h1>{title}</h1>
						</div>
					</header>
					<div id="primary" className="content-area">
						<div id="content" className="site-content" role="main">
							<article id="post-190" className="post-190 post type-post status-publish format-standard hentry category-ionic tag-firebase tag-ionic tag-login tag-register libretto-long-form">
								<div className="entry-content"
									dangerouslySetInnerHTML={{__html: content}} />
							</article>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}

}
