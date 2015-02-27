var Reflux = require('reflux');
var wordGeneratorActions = require('../actions/actions').wordGeneratorActions;
var WordGeneratorLoader = require('../utils/WordGeneratorLoader');
var Promise = require('native-promise-only');


module.exports = Reflux.createStore({
	listenables: wordGeneratorActions,

	init: function () {
		this.defaultConfig = {
			sourceWordsUrl: '/wordlists/wordsEnglish.txt',
			wordStartsWith: null,
			chainOrder: 3,
			minWordLength: 4,
			maxWordLength: 7
		};
		this.wordGeneratorLoader = null;
		this.wordGenerator = null;
	},
	getInitialState: function () {
		return this.wordGenerator;
	},
	getConfig: function () {
		if (!this.wordGeneratorLoader) {
			return null;
		}
		return this.wordGeneratorLoader.getConfig();
	},

	onUpdateConfig: function (newConfig) {
		var action = wordGeneratorActions.updateConfig;

		var newWordGeneratorLoader = this.wordGeneratorLoader ? this.wordGeneratorLoader.updateFromConfig(newConfig) : WordGeneratorLoader.fromConfig(newConfig);
		if (newWordGeneratorLoader == this.wordGeneratorLoader) {
			action.promise(Promise.resolve(this.wordGeneratorLoader));
		}

		/*// causes false positive error:
		 action.promise(Promise.resolve(newWordGeneratorLoader.load()).then(function (newWordGenerator) {
		 return newWordGeneratorLoader;
		 }));*/

		newWordGeneratorLoader.load()
			.then(function (newWordGenerator) {
				action.completed(newWordGeneratorLoader);
			})
			.catch(action.failed);
	},

	onUpdateConfigCompleted: function (newWordGeneratorLoader) {
		if (newWordGeneratorLoader == this.wordGeneratorLoader) {
			return;
		}
		this.wordGeneratorLoader = newWordGeneratorLoader;
		this.wordGenerator = this.wordGeneratorLoader.wordGenerator;
		this.trigger(this.wordGenerator);
	}

});
