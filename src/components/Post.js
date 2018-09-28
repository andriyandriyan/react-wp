import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Post = ({ post }) => {
	const posted = moment(post.date).format('D MMM YYYY');
	return (
		<article className="hentry post libretto-long-form">
			<header className="entry-header">
				<div className="entry-meta">
					<span className="posted-on">Posted on <Link to={post.slug}>
						<time className="entry-date">{posted}</time>
					</Link>
					</span>
				</div>
				<h2 className="entry-title">
					<Link to={post.slug}>{post.title.rendered}</Link>
				</h2>
			</header>
		</article>
	);
};

export { Post };
