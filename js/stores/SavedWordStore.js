var Reflux = require('reflux');
var savedWordsActions = require('../actions/actions').savedWordsActions;
var _ = require('lodash');
var ls = require('easy-localstorage');

var idCounter = 0;

module.exports = Reflux.createStore({
	listenables: savedWordsActions,

	init: function () {
		var localStorageList = ls.get('saved-words');
		if (localStorageList) {
			this.list = _.map(localStorageList, function (item) {
				//reset keys
				item.key = ++idCounter;
				return item;
			});
		} else {
			this.list = [];
		}
	},
	getInitialState: function () {
		return this.list;
	},

	updateList: function (list) {
		ls.set('saved-words', list);
		this.list = list;
		this.trigger(list);
	},
	updateListIfSizeChanged: function (list) {
		if (list.length == this.list.length) {
			return;
		}
		this.updateList(list);
	},

	listDoesNotContain: function (word) {
		return _.findIndex(this.list, function (item) {
				return item.word == word;
			}) < 0;
	},

	onAdd: function (words) {
		if (!_.isArray(words)) {
			words = [words];
		}
		words = words.filter(this.listDoesNotContain);
		if (words.length <= 0) {
			return;
		}
		this.updateListIfSizeChanged(this.list.concat(words.map(function (word) {
			return {
				key: ++idCounter,
				word: word
			};
		})));
	},

	onRemove: function (word) {
		this.updateListIfSizeChanged(_.filter(this.list, function (item) {
			return item.word !== word;
		}));
	},

	onClear: function () {
		this.updateListIfSizeChanged([]);
	}
});
