var React = require('react');
var InfiniteScroll = require('react-infinite-scroll')(React);
var WordListItem = require('./WordListItem.react.js');
var GeneratedWordStore = require('../stores/GeneratedWordStore');
var WordGeneratorStore = require('../stores/WordGeneratorStore');
var _ = require('lodash');

WordGeneratorStore.init();
WordGeneratorStore.addWordGeneratorChangeListener(function () {
	console.log('Clearing and adding new words to store');
	GeneratedWordStore.clear();
	generateWords();
});

function generateWords() {
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
			key={_.uniqueId()}
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
	},
	componentWillUnmount: function () {
		GeneratedWordStore.removeChangeListener(this._onChange);
	},
	loadMore: function () {
		console.log('loadMore');

		generateWords();
	},
	render: function () {
		return (
			<div className="word-list">
				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadMore}
					hasMore={true}
				>{this.state.items.map(getWordListItem)}</InfiniteScroll>
			</div>
		);
	}
});

module.exports = InfiniteWordList;
