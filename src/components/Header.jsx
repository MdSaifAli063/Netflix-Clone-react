////////////
// Header //
////////////

var Header = React.createClass({
	render: function() {
		return (
			<header className="Header">
				<Logo />
				<Navigation />
				<Search onSubmit={this.props.onSubmit} />
				<UserProfile />
			</header>
		);
	}
});