var React = require('react');
var InfiniteScroll = require('react-infinite-scroll')(React);
var WordListItem = require('./WordListItem.react.js');
var GeneratedWordStore = require('../stores/GeneratedWordStore');
var SavedWordStore = require('../stores/SavedWordStore');
var WordGeneratorStore = require('../stores/WordGeneratorStore');

function loadMore() {
	console.log('loadMore');

	var wordGenerator = WordGeneratorStore.getWordGenerator();
	if (wordGenerator) {
		GeneratedWordStore.addArray(wordGenerator.generateWords(25));
	}
}

function getState() {
	return {
		items: GeneratedWordStore.getAll()
	};
}

function getWordListItem(word) {
	return (
		<WordListItem
			key={word}
			word={word}
		/>
	);
}

var InfiniteWordList = React.createClass({
	getInitialState: function () {
		return getState();
	},
	_onChange: function () {
		this.setState(getState());
	},
	componentDidMount: function () {
		GeneratedWordStore.addChangeListener(this._onChange);
		SavedWordStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function () {
		GeneratedWordStore.removeChangeListener(this._onChange);
		SavedWordStore.removeChangeListener(this._onChange);
	},
	render: function () {
		return (
			<div className="word-list">
				<InfiniteScroll
					pageStart={0}
					loadMore={loadMore}
					hasMore={true}
				>{this.state.items.map(getWordListItem)}</InfiniteScroll>
			</div>
		);
	}
});

module.exports = InfiniteWordList;
