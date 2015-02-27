var React = require('react');

var WordApp = require('./components/WordApp.react.js');
var WordGeneratorStore = require('./stores/WordGeneratorStore');
var actions = require('./actions/actions');

React.render(
	<WordApp />,
	document.getElementById('container')
);

actions.wordGeneratorActions.updateConfig.triggerPromise(WordGeneratorStore.defaultConfig)
	.catch(function (error) {
		// something went wrong while loading the new word generator

		console.warn(error);

		alert(error);
	});
