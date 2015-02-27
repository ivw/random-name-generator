var React = require('react');
var Reflux = require('reflux');
var SavedWordList = require('./SavedWordList.react');
var InfiniteWordList = require('./InfiniteWordList.react');
var WordGeneratorConfig = require('./WordGeneratorConfig.react');
var BackToTop = require('./BackToTop.react');
var SiteTop = require('./SiteTop.react');
var ReactLoader = require('react-loader');
var WordGeneratorIsLoadingStore = require('../stores/WordGeneratorIsLoadingStore');

var WordApp = React.createClass({
	mixins: [
		Reflux.connect(WordGeneratorIsLoadingStore, "isLoading")
	],
	render: function () {
		return (
			<div>
				<SiteTop />

				<div className="container">

					<SavedWordList />

					<WordGeneratorConfig />

					<InfiniteWordList />

				</div>

				<BackToTop />

				<ReactLoader loaded={!this.state.isLoading} />

			</div>
		);
	}
});

module.exports = WordApp;
