import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

class Header extends Component {

	state = {
		isShowSearch: false,
		menuVisible: false
	};

	showSearchForm = () => {
		this.setState({ isShowSearch: !this.state.isShowSearch });
	}

	showMenu = () => {
		this.setState({ menuVisible: !this.state.menuVisible });
	}

	renderCategory() {
		return this.props.categories.map(category =>
			<li key={category.id} className="menu-item menu-item-type-taxonomy menu-item-object-category">
				<Link to={'category/' + category.slug}>{category.name}</Link>
			</li>
		);
	}

	render() {
		const { isShowSearch, menuVisible } = this.state;
		const searchFormClass = isShowSearch ? 'libretto-open' : '';
		const menuVisibleClass = menuVisible ? 'menu-visible' : '';
		return (
			<header className="nav-bar" onClick={this.showMenu}>
				<div className="site-branding">
					<h1 className="site-title"><Link to="/" title={config.SITE_NAME} rel="home">{config.SITE_NAME}</Link></h1>
				</div>

				<nav id="site-navigation" className="navigation-main">
					<div className="menu-toggle"><span className="mobile-site-title">{config.SITE_NAME}</span>
						<button id="menu-icon" className={menuVisible ? 'open': ''}>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
					<div className="screen-reader-text skip-link">
						<a href="#content" title="Skip to content">Skip to content</a>
					</div>
					<div className={'menu-wrapper ' + menuVisibleClass}>
						<div className="menu-main-menu-container">
							<ul id="menu-main-menu" className="menu">
								{this.renderCategory()}
							</ul>
						</div>
						<form onClick={this.showSearchForm}
							className={searchFormClass + ' search-form'}>
							<label>
								<span className="screen-reader-text">Cari untuk:</span>
								<input type="search" className="search-field" placeholder="Cari …" name="s" />
							</label>
							<input type="submit" className="search-submit" />
						</form>
					</div>
				</nav>
			</header>
		);
	}
}

export { Header };
