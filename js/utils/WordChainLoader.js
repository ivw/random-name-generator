var Promise = require('native-promise-only');
var _ = require('lodash');
var Foswig = require('foswig');
var FilteredSourceWordsLoader = require('./FilteredSourceWordsLoader');

function WordChainLoader(chainOrder, filteredSourceWordsLoader) {
	this.chainOrder = chainOrder;
	this.filteredSourceWordsLoader = filteredSourceWordsLoader;
}

WordChainLoader.fromConfig = function (config) {
	return new WordChainLoader(config.chainOrder, FilteredSourceWordsLoader.fromConfig(config));
};

WordChainLoader.prototype.updateFromConfig = function (config) {
	var newFilteredSourceWordsLoader = this.filteredSourceWordsLoader.updateFromConfig(config);

	if (config.chainOrder == this.chainOrder && newFilteredSourceWordsLoader == this.filteredSourceWordsLoader) {
		return this;
	}

	return new WordChainLoader(config.chainOrder, newFilteredSourceWordsLoader);
};

WordChainLoader.prototype.load = function () {
	var self = this;
	if (this.wordChain) {
		return new Promise(function (resolve, reject) {
			resolve(self.wordChain);
		});
	}
	return this.filteredSourceWordsLoader.load()
		.then(function (filteredSourceWords) {
			console.log('Creating new word chain');
			self.wordChain = new Foswig(self.chainOrder);
			self.wordChain.addWordsToChain(filteredSourceWords);
			return self.wordChain;
		});
};

WordChainLoader.prototype.getConfig = function () {
	return _.assign({}, this.filteredSourceWordsLoader.getConfig(), {
		chainOrder: this.chainOrder
	});
};

module.exports = WordChainLoader;
