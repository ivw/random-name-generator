var Promise = require('promise');
var _ = require('lodash');
var WordChainLoader = require('./WordChainLoader');
var WordGenerator = require('./WordGenerator');

function WordGeneratorLoader(minWordLength, maxWordLength, wordChainLoader) {
	if (minWordLength <= 0 || maxWordLength <= 0) {
		throw new Error("Word length must be above 0");
	}
	if (minWordLength > maxWordLength) {
		throw new Error("Minimal word length can't be under the maximal word length");
	}
	this.minWordLength = minWordLength;
	this.maxWordLength = maxWordLength;
	this.wordChainLoader = wordChainLoader;
}

WordGeneratorLoader.fromConfig = function (config) {
	return new WordGeneratorLoader(config.minWordLength, config.maxWordLength, WordChainLoader.fromConfig(config));
};

WordGeneratorLoader.prototype.updateFromConfig = function (config) {
	var newWordChainLoader = this.wordChainLoader.updateFromConfig(config);

	if (config.minWordLength == this.minWordLength && config.maxWordLength == this.maxWordLength && newWordChainLoader == this.wordChainLoader) {
		return this;
	}

	return new WordGeneratorLoader(config.minWordLength, config.maxWordLength, newWordChainLoader);
};

WordGeneratorLoader.prototype.load = function () {
	var self = this;
	if (this.wordGenerator) {
		return new Promise(function (resolve, reject) {
			resolve(self.wordGenerator);
		});
	}
	return this.wordChainLoader.load()
		.then(function (wordChain) {
			return self.wordGenerator = new WordGenerator(self.minWordLength, self.maxWordLength, wordChain);
		});
};

WordGeneratorLoader.prototype.getConfig = function () {
	return _.assign({}, this.wordChainLoader.getConfig(), {
		minWordLength: this.minWordLength,
		maxWordLength: this.maxWordLength
	});
};

module.exports = WordGeneratorLoader;
