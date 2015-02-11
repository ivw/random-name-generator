var generatedWords = [];

function add(wordText) {
	//TODO skip words that already are in the generatedWords
	generatedWords = generatedWords.concat([wordText]);
}

module.exports.getAll = function () {
	return generatedWords;
};

module.exports.add = function (wordText) {
	add(wordText);
	emitChange();
};

module.exports.addArray = function (wordTextArray) {
	wordTextArray.forEach(function (wordText) {
		add(wordText);
	});
	emitChange();
};

module.exports.clear = function () {
	generatedWords = [];
	emitChange();
};


//////////////////////////////////////////////////////////
// Events

var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var emitter = new EventEmitter();

function emitChange() {
	emitter.emit(CHANGE_EVENT);
}

module.exports.addChangeListener = function (callback) {
	emitter.on(CHANGE_EVENT, callback);
};

module.exports.removeChangeListener = function (callback) {
	emitter.off(CHANGE_EVENT, callback);
};
