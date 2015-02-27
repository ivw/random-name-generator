var React = require('react');
var Reflux = require('reflux');
var InfiniteScroll = require('react-infinite-scroll')(React);
var WordListItem = require('./WordListItem.react.js');
var GeneratedWordStore = require('../stores/GeneratedWordStore');
var SavedWordStore = require('../stores/SavedWordStore');
var WordGeneratorStore = require('../stores/WordGeneratorStore');
var actions = require('../actions/actions');

function loadMore() {
	console.log('loadMore');

	var generatedWords = WordGeneratorStore.wordGenerator.generateWords(25);
	if (generatedWords.length <= 0) {
		return;
	}
	actions.generatedWordsActions.add(generatedWords);
}

function getWordListItem(item) {
	return (
		<WordListItem
			key={item.key}
			word={item.word}
		/>
	);
}

var InfiniteWordList = React.createClass({
	mixins: [
		Reflux.listenTo(GeneratedWordStore, "onWordsChange"),
		Reflux.listenTo(SavedWordStore, "onWordsChange"),
		Reflux.listenTo(WordGeneratorStore, "onWordGeneratorChange")
	],
	getInitialState: function () {
		return {
			items: GeneratedWordStore.list,
			hasMore: !!WordGeneratorStore.wordGenerator
		};
	},
	onWordsChange: function () {
		this.setState({
			items: GeneratedWordStore.list
		});
	},
	onWordGeneratorChange: function () {
		this.setState({
			hasMore: !!WordGeneratorStore.wordGenerator
		});
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
							loader={<div className="infinite-list-end">
								<em>Can't generate any more words with the current settings</em>
							</div>}
						>{this.state.items.map(getWordListItem)}</InfiniteScroll>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = InfiniteWordList;
