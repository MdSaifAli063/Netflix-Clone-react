


// Title List Item
var Item = React.createClass({
	render: function() {
		return (
			<div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
				<div className="overlay">
					<div className="title">{this.props.title}</div>
					<div className="rating">{this.props.score} / 10</div>
					<div className="plot">{this.props.overview}</div>
					<ListToggle />
				</div>
			</div>
		);
	}
});