var React = require('react');
var SavedWordListItem = require('./SavedWordListItem.react.js');
var SavedWordStore = require('../stores/SavedWordStore');
var _ = require('lodash');


function getState() {
	return {
		items: SavedWordStore.getAll()
	};
}

function getSavedWordListItem(word) {
	return (
		<SavedWordListItem
			key={word}
			word={word}
		/>
	);
}

var SavedWordList = React.createClass({
	getInitialState: function () {
		return getState();
	},
	_onChange: function () {
		this.setState(getState());
	},
	componentDidMount: function () {
		SavedWordStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function () {
		SavedWordStore.removeChangeListener(this._onChange);
	},
	render: function () {
		return (
			<div className="word-list">
				{this.state.items.map(getSavedWordListItem)}
			</div>
		);
	}
});

module.exports = SavedWordList;
