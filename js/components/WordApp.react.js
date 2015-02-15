var React = require('react');
var SavedWordList = require('./SavedWordList.react');
var InfiniteWordList = require('./InfiniteWordList.react');
var WordGeneratorConfig = require('./WordGeneratorConfig.react');
var BackToTop = require('./BackToTop.react');
var SiteTop = require('./SiteTop.react');
var ReactLoader = require('react-loader');
var WordGeneratorStore = require('../stores/WordGeneratorStore');

function getState() {
	return {
		isLoading: WordGeneratorStore.isLoading()
	};
}

var WordApp = React.createClass({
	getInitialState: function () {
		return getState();
	},
	_onChange: function () {
		this.setState(getState());
	},
	componentDidMount: function () {
		WordGeneratorStore.addLoadChangeListener(this._onChange);
	},
	componentWillUnmount: function () {
		WordGeneratorStore.removeLoadChangeListener(this._onChange);
	},
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
