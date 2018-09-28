import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { http } from './services';
import { Header, Footer } from './components';
import loader from './assets/images/loader.svg';
import './style.css';
import 'nprogress/nprogress.css';

function Loading() {
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

const Home = Loadable({
	loader: () => import('./views/Home'),
	loading: Loading
});

const PostDetail = Loadable({
	loader: () => import('./views/PostDetail'),
	loading: Loading
});


class App extends Component {

	state = { categories: [] };

	componentDidMount() {
		http.get('categories').then(categories => {
			this.setState({ categories });
		});
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header categories={this.state.categories} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/:slug" component={PostDetail} />
					</Switch>
					<Footer categories={this.state.categories} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
