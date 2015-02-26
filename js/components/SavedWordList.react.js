var React = require('react');
var Reflux = require('reflux');
var SavedWordListItem = require('./SavedWordListItem.react.js');
var SavedWordStore = require('../stores/SavedWordStore');

function getSavedWordListItem(item) {
	return (
		<SavedWordListItem
			key={item.key}
			word={item.word}
		/>
	);
}

var SavedWordList = React.createClass({
	mixins: [Reflux.connect(SavedWordStore, "items")],
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
