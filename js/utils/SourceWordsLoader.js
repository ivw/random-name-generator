var Promise = require('promise');
var request = require('superagent');

function fixAbsoluteLocalUrl(url) {
	if (url.substr(0, 1) == '/') {
		return location.pathname.substring(0, location.pathname.lastIndexOf('/')) + url;
	}
	return url;
}

function SourceWordsLoader(sourceWordsUrl) {
	this.sourceWordsUrl = sourceWordsUrl;
}

SourceWordsLoader.fromConfig = function (config) {
	return new SourceWordsLoader(config.sourceWordsUrl);
};

SourceWordsLoader.prototype.updateFromConfig = function (config) {
	if (config.sourceWordsUrl == this.sourceWordsUrl) {
		return this;
	}

	return new SourceWordsLoader(config.sourceWordsUrl);
};

SourceWordsLoader.prototype.load = function () {
	var self = this;
	if (this.sourceWords) {
		return new Promise(function (resolve, reject) {
			resolve(self.sourceWords);
		});
	}
	console.log('Loading source words');
	return (
		new Promise(function (resolve, reject) {
			request
				.get(fixAbsoluteLocalUrl(self.sourceWordsUrl))
				.end(function (res) {
					resolve(res);
				});
		})
	)
		.then(function (res) {
			if (res.error) {
				throw new Error(res.error.message);
			}

			var sourceWords = res.text.split(/\s+/g);
			if (sourceWords.length <= 0) {
				throw new Error('No words');
			}
			return self.sourceWords = sourceWords;
		});
};

SourceWordsLoader.prototype.getConfig = function () {
	return {
		sourceWordsUrl: this.sourceWordsUrl
	};
};

module.exports = SourceWordsLoader;
