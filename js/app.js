var React = require('react');

var WordApp = require('./components/WordApp.react.js');
var WordGeneratorStore = require('./stores/WordGeneratorStore');
var GeneratedWordStore = require('./stores/GeneratedWordStore');

React.render(
	<WordApp />,
	document.getElementById('container')
);

WordGeneratorStore.init();
WordGeneratorStore.addWordGeneratorChangeListener(function () {
	console.log('Clearing and adding new words to store');

	GeneratedWordStore.clear();

	var wordGenerator = WordGeneratorStore.getWordGenerator();
	if (wordGenerator) {
		GeneratedWordStore.addArray(wordGenerator.generateWords(50));
	}
});
