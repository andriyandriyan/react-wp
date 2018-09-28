import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../services';

class Footer extends Component {

	state = {
		recentPosts: [],
		tags: []
	};

	componentDidMount() {
		this.getRecentPosts();
		this.getTags();
	}

	getRecentPosts() {
		http.get('posts?per_page=5').then(recentPosts => {
			this.setState({ recentPosts });
		});
	}

	renderRecentPost() {
		return this.state.recentPosts.map(recentPost => (
			<li key={recentPost.id}>
				<Link to={recentPost.slug}>{recentPost.title.rendered}</Link>
			</li>
		));
	}

	renderSkeletonRecentPost() {
		const skeletons = [];
		for (let i = 0; i < 5; i++) {
			const skeleton = <li key={i} className="loading widget_recent_entries"></li>;
			skeletons.push(skeleton);
		}
		return skeletons;
	}

	getTags() {
		http.get('tags?per_page=50').then(tags => {
			this.setState({ tags });
		});
	}

	renderTags() {
		const fontSize = [8, 12, 20];
		return this.state.tags.map(tag => {
			const rand = Math.floor(Math.random() * Math.floor(3));
			return (
				<Link key={tag.id} to={'tag/' + tag.slug} className="tag-cloud-link"
					style={{ fontSize: fontSize[rand] + 'pt' }} aria-label={tag.name}>
					{tag.name}
				</Link>
			);
		});
	}

	renderSkeletonTag() {
		const skeletons = [];
		for (let i = 0; i < 8; i++) {
			const skeleton = <div key={i} className="loading tags"></div>;
			skeletons.push(skeleton);
		}
		return skeletons;
	}

	renderCategories() {
		return this.props.categories.map(category => (
			<li key={category.id}>
				<Link to={'category/' + category.slug}>{category.name}</Link>
			</li>
		));
	}

	renderSkeletonCategories() {
		const skeletons = [];
		for (let i = 0; i < 5; i++) {
			const skeleton = <li key={i} className="loading widget_recent_entries"></li>;
			skeletons.push(skeleton);
		}
		return skeletons;
	}

	render() {
		return (
			<section id="footer-sidebar" className="clear widget-area" role="complementary">
				<div id="sidebar-1" className="widget-block">
					<aside id="categories-2" className="widget widget_categories">
						<h2 className="widget-title">Kategori</h2>
						<ul>
							{this.props.categories.length === 0 && this.renderSkeletonCategories()}
							{this.renderCategories()}
						</ul>
					</aside>
				</div>
				<div id="sidebar-2" className="widget-block">
					<aside id="recent-posts-4" className="widget widget_recent_entries">
						<h2 className="widget-title">Pos-pos Terbaru</h2>
						<ul>
							{this.state.recentPosts.length === 0 && this.renderSkeletonRecentPost()}
							{this.renderRecentPost()}
						</ul>
					</aside>
				</div>
				<div id="sidebar-3" className="widget-block">
					<aside id="tag_cloud-3" className="widget widget_tag_cloud">
						<h2 className="widget-title">Tag</h2>
						<div className="tagcloud">
							{this.state.tags.length === 0 && this.renderSkeletonTag()}
							{this.renderTags()}
						</div>
					</aside>
				</div>
				<div id="sidebar-4" className="widget-block">
					<aside id="text-3" className="widget widget_text">
						<h2 className="widget-title">About Author</h2>
						<div className="textwidget">
							<p><img className="wp-image-12 aligncenter" src="http://andriyandriyan.com/wp-content/uploads/2017/12/25006672_462741230788510_6677528939495161856_n-300x300.jpg" alt="" width="126" height="126" /></p>
							<p>Muslim, Penyuka Kucing, Web dan Mobile Hybrid Developer</p>
						</div>
					</aside>
				</div>
			</section>
		);
	}
}

export { Footer };
