var React = require('react');

var InfiniteWordListItem = React.createClass({
	render: function () {
		return <div className="word-list-item">{this.props.word}</div>;
	}
});

module.exports = InfiniteWordListItem;
