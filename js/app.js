var React = require('react');

var WordApp = require('./components/WordApp.react.js');
var WordGeneratorStore = require('./stores/WordGeneratorStore');

React.render(
	<WordApp />,
	document.getElementById('container')
);

WordGeneratorStore.init()
	.catch(function (error) {
		// something went wrong while loading the new word generator

		console.warn(error);

		alert(error);
	});
