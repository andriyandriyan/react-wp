import React from 'react';

const SkeletonPost = ({ count }) => {
	const posts = [];
	for (let i = 0; i < count; i++) {
		const post = (
			<article key={i} className="post hentry libretto-long-form">
				<header className="entry-header">
					<div className="posted loading"></div>
					<div className="title loading"></div>
				</header>
			</article>
		);
		posts.push(post);
	}
	return posts;
};

export { SkeletonPost };
