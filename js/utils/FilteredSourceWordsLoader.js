var Promise = require('native-promise-only');
var _ = require('lodash');
var SourceWordsLoader = require('./SourceWordsLoader');

function FilteredSourceWordsLoader(wordStartsWith, sourceWordsLoader) {
	this.wordStartsWith = wordStartsWith;
	this.sourceWordsLoader = sourceWordsLoader;
}

FilteredSourceWordsLoader.fromConfig = function (config) {
	return new FilteredSourceWordsLoader(config.wordStartsWith, SourceWordsLoader.fromConfig(config));
};

FilteredSourceWordsLoader.prototype.updateFromConfig = function (config) {
	var newSourceWordsLoader = this.sourceWordsLoader.updateFromConfig(config);

	if (config.wordStartsWith == this.wordStartsWith && newSourceWordsLoader == this.sourceWordsLoader) {
		return this;
	}

	return new FilteredSourceWordsLoader(config.wordStartsWith, newSourceWordsLoader);
};

FilteredSourceWordsLoader.prototype.load = function () {
	var self = this;
	if (this.filteredSourceWords) {
		return Promise.resolve(self.filteredSourceWords);
	}
	return this.sourceWordsLoader.load()
		.then(function (sourceWords) {
			console.log('Filtering source words');

			if (!self.wordStartsWith) {
				return self.filteredSourceWords = sourceWords;
			}

			var filteredSourceWords = sourceWords.filter(function (sourceWord) {
				return _.startsWith(sourceWord, self.wordStartsWith);
			});
			if (filteredSourceWords.length <= 0) {
				throw new Error('No words that start with "' + self.wordStartsWith + '"');
			}
			return self.filteredSourceWords = filteredSourceWords;
		});
};

FilteredSourceWordsLoader.prototype.getConfig = function () {
	return _.assign({}, this.sourceWordsLoader.getConfig(), {
		wordStartsWith: this.wordStartsWith
	});
};

module.exports = FilteredSourceWordsLoader;
