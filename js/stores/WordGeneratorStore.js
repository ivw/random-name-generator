var WordGeneratorLoader = require('../utils/WordGeneratorLoader');
var _ = require('lodash');

var defaultConfig = {
	sourceWordsUrl: '/wordlists/wordsEn.txt',
	wordStartsWith: null,
	chainOrder: 3,
	minWordLength: 4,
	maxWordLength: 7
};

// We save the loader so we can use its updateFromConfig method which can reuse its subcomponents if their config is the same.
// This can be a lot faster than making a whole loader from scratch every time with fromConfig
var wordGeneratorLoader = null;

var wordGenerator = null;

var isLoading = false;

function updateConfig(newConfig) {
	if (isLoading) {
		throw new Error("Can't update the config while it's loading");
	}

	var newWordGeneratorLoader = wordGeneratorLoader ? wordGeneratorLoader.updateFromConfig(newConfig) : WordGeneratorLoader.fromConfig(newConfig);
	if (newWordGeneratorLoader == wordGeneratorLoader) {
		return new Promise(function (resolve, reject) {
			resolve(wordGenerator);
		});
	}

	isLoading = true;
	emitLoadChange();

	return newWordGeneratorLoader.load()
		.then(function (newWordGenerator) {
			isLoading = false;
			emitLoadChange();

			wordGeneratorLoader = newWordGeneratorLoader;
			wordGenerator = newWordGenerator;
			emitWordGeneratorChange();
		})
		.catch(function (error) {
			isLoading = false;
			emitLoadChange();

			throw error;
		});
}


module.exports.init = function () {
	//TODO config localStorage
	return updateConfig(_.assign({}, defaultConfig));
};

module.exports.updateConfig = updateConfig;

module.exports.getConfig = function () {
	if (!wordGeneratorLoader) {
		return null;
	}
	return wordGeneratorLoader.getConfig();
};

module.exports.getWordGenerator = function () {
	return wordGenerator;
};

module.exports.isLoading = function () {
	return isLoading;
};


//////////////////////////////////////////////////////////
// Events

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();


var LOAD_CHANGE_EVENT = 'loadChange';

function emitLoadChange() {
	console.log(LOAD_CHANGE_EVENT);
	emitter.emit(LOAD_CHANGE_EVENT);
}

module.exports.addLoadChangeListener = function (callback) {
	emitter.on(LOAD_CHANGE_EVENT, callback);
};

module.exports.removeLoadChangeListener = function (callback) {
	emitter.off(LOAD_CHANGE_EVENT, callback);
};


var WORD_GENERATOR_CHANGE_EVENT = 'wordGeneratorChange';

function emitWordGeneratorChange() {
	console.log(WORD_GENERATOR_CHANGE_EVENT);
	emitter.emit(WORD_GENERATOR_CHANGE_EVENT);
}

module.exports.addWordGeneratorChangeListener = function (callback) {
	emitter.on(WORD_GENERATOR_CHANGE_EVENT, callback);
};

module.exports.removeWordGeneratorChangeListener = function (callback) {
	emitter.off(WORD_GENERATOR_CHANGE_EVENT, callback);
};
