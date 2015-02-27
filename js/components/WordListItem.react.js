var React = require('react');
var SavedWordStore = require('../stores/SavedWordStore');
var actions = require('../actions/actions');

var InfiniteWordListItem = React.createClass({
	handleSaveButtonClick: function (e) {
		e.preventDefault();

		actions.savedWordsActions.add(this.props.word);
	},
	handleUnsaveButtonClick: function (e) {
		e.preventDefault();

		actions.savedWordsActions.remove(this.props.word);
	},
	renderSaveButton: function () {
		if (SavedWordStore.listDoesNotContain(this.props.word)) {
			return (
				<a href="javascript:;" onClick={this.handleSaveButtonClick}>
					<i className="fa fa-star-o"></i>
				</a>
			);
		}
		return (
			<a href="javascript:;" onClick={this.handleUnsaveButtonClick}>
				<i className="fa fa-star"></i>
			</a>
		);
	},
	render: function () {
		var googleLink = "https://www.google.nl/search?q=" + encodeURIComponent('"' + this.props.word + '"');
		return (
			<div className="word-list-item">
				{this.props.word}
				{this.renderSaveButton()}
				<a href={googleLink} target="_blank">
					<i className="fa fa-google"></i>
				</a>
			</div>
		);
	}
});

module.exports = InfiniteWordListItem;
