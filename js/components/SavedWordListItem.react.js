var React = require('react');
var actions = require('../actions/actions');

var SavedWordListItem = React.createClass({
	handleClick: function (e) {
		e.preventDefault();

		actions.savedWordsActions.remove(this.props.word);
	},
	render: function () {
		var googleLink = "https://www.google.nl/search?q=" + encodeURIComponent('"' + this.props.word + '"');
		return (
			<div className="word-list-item">
				{this.props.word}
				<a href="javascript:;" onClick={this.handleClick}>
					<i className="fa fa-times"></i>
				</a>
				<a href={googleLink} target="_blank">
					<i className="fa fa-google"></i>
				</a>
			</div>
		);
	}
});

module.exports = SavedWordListItem;
