var React = require('react');
var SavedWordStore = require('../stores/SavedWordStore');

var SavedWordListItem = React.createClass({
	handleClick: function (e) {
		e.preventDefault();

		SavedWordStore.remove(this.props.word);
	},
	render: function () {
		return (
			<div className="word-list-item">
				{this.props.word}
				<a href="javascript:;" onClick={this.handleClick}>
					<i className="fa fa-times"></i>
				</a>
			</div>
		);
	}
});

module.exports = SavedWordListItem;
