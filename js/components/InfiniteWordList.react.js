var React = require('react');
var InfiniteScroll = require('react-infinite-scroll')(React);
var WordListItem = require('./WordListItem.react.js');
var GeneratedWordStore = require('../stores/GeneratedWordStore');
var SavedWordStore = require('../stores/SavedWordStore');
var WordGeneratorStore = require('../stores/WordGeneratorStore');

function loadMore() {
	console.log('loadMore');

	GeneratedWordStore.addArray(WordGeneratorStore.getWordGenerator().generateWords(25));
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
		return {
			items: GeneratedWordStore.getAll(),
			hasMore: !!WordGeneratorStore.getWordGenerator()
		};
	},
	_onWordsChange: function () {
		this.setState({
			items: GeneratedWordStore.getAll()
		});
	},
	_onWordGeneratorChange: function () {
		this.setState({
			hasMore: !!WordGeneratorStore.getWordGenerator()
		});
	},
	componentDidMount: function () {
		GeneratedWordStore.addChangeListener(this._onWordsChange);
		SavedWordStore.addChangeListener(this._onWordsChange);
		WordGeneratorStore.addWordGeneratorChangeListener(this._onWordGeneratorChange);
	},
	componentWillUnmount: function () {
		GeneratedWordStore.removeChangeListener(this._onWordsChange);
		SavedWordStore.removeChangeListener(this._onWordsChange);
		WordGeneratorStore.removeWordGeneratorChangeListener(this._onWordGeneratorChange);
	},
	render: function () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="word-list">
						<InfiniteScroll
							pageStart={0}
							loadMore={loadMore}
							hasMore={this.state.hasMore}
						>{this.state.items.map(getWordListItem)}</InfiniteScroll>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = InfiniteWordList;
