var ls = require('easy-localstorage');

var words;

init();

function init() {
	var savedWords = ls.get('saved-words');
	words = savedWords ? savedWords : [];
}

function add(word) {
	var i = words.indexOf(word);
	if (i >= 0) {
		return false;
	}
	words.push(word);
	return true;
}

function remove(word) {
	var i = words.indexOf(word);
	if (i < 0) {
		return false;
	}
	words.splice(i, 1);
	return true;
}

function onChange() {
	saveToLocalStorage();
	emitChange();
}

function saveToLocalStorage() {
	ls.set('saved-words', words);
}

module.exports.getAll = function () {
	return words;
};

module.exports.has = function (word) {
	return words.indexOf(word) >= 0;
};

module.exports.add = function (word) {
	if (add(word)) {
		onChange();
	}
};

module.exports.addArray = function (wordArray) {
	var sizeBefore = words.length;
	wordArray.forEach(add);
	if (words.length != sizeBefore) {
		onChange();
	}
};

module.exports.remove = function (word) {
	if (remove(word)) {
		onChange();
	}
};

module.exports.clear = function () {
	if (words.length <= 0) {
		return;
	}
	words = [];
	onChange();
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
