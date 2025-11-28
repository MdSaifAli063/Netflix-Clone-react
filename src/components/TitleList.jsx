

// Title List Container

var TitleList = React.createClass({
	apiKey: '87dfa1c669eea853da609d4968d294be',
	getInitialState: function() {
		return {data: [], mounted: false};
	},
	loadContent: function() {
		var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;
		
		$.ajax({
      url: requestUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
				// console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	componentDidMount: function() {
		this.loadContent();
		this.setState({ mounted: true });
	},
	componentWillUnmount: function() {
		this.setState({ mounted: false });
	},
	render: function() {
		if(this.state.data.results) {
			var titles = this.state.data.results.map(function(title, i) {
				if(i < 5) {

					var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
					if(!title.name) {
						var name = title.original_title;
					} else {
						var name = title.name;
					}

					return (
						<Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
					);	

				}
			});	

		} else {
			var titles = '';
		}
		
		return (
			<div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
				<div className="Title">
					<h1>{this.props.title}</h1>
					<div className="titles-wrapper">
						{titles}
					</div>
				</div>
			</div>
		);
	}
});
