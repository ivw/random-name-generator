var React = require('react');
var SavedWordStore = require('../stores/SavedWordStore');

var InfiniteWordListItem = React.createClass({
	handleSaveButtonClick: function (e) {
		e.preventDefault();

		SavedWordStore.add(this.props.word);
	},
	handleUnsaveButtonClick: function (e) {
		e.preventDefault();

		SavedWordStore.remove(this.props.word);
	},
	renderSaveButton: function () {
		if (SavedWordStore.has(this.props.word)) {
			return (
				<a href="javascript:;" onClick={this.handleUnsaveButtonClick}>
					<i className="fa fa-star"></i>
				</a>
			);
		}
		return (
			<a href="javascript:;" onClick={this.handleSaveButtonClick}>
				<i className="fa fa-star-o"></i>
			</a>
		);
	},
	render: function () {
		var saveButton = null;
		return (
			<div className="word-list-item">
				{this.props.word}
				{this.renderSaveButton()}
			</div>
		);
	}
});

module.exports = InfiniteWordListItem;
