var words = [];

function add(word) {
	var i = words.indexOf(word);
	if (i >= 0) {
		return;
	}
	words.push(word);
}

function remove(word) {
	var i = words.indexOf(word);
	if (i < 0) {
		return;
	}
	words.splice(i, 1);
}

module.exports.getAll = function () {
	return words;
};

module.exports.has = function (word) {
	return words.indexOf(word) >= 0;
};

module.exports.add = function (word) {
	add(word);
	emitChange();
};

module.exports.addArray = function (wordArray) {
	wordArray.forEach(add);
	emitChange();
};

module.exports.remove = function (word) {
	remove(word);
	emitChange();
};

module.exports.clear = function () {
	words = [];
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
