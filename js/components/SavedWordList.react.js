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
		if (this.state.items.length <= 0) {
			return null;
		}
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="word-list">
							<div className="page-header">
								<h3>Saved names</h3>
							</div>
							{this.state.items.map(getSavedWordListItem)}
						</div>
					</div>
				</div>
				<div className="page-header">
				</div>
			</div>
		);
	}
});

module.exports = SavedWordList;
