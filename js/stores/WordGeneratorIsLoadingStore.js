var Reflux = require('reflux');
var wordGeneratorActions = require('../actions/actions').wordGeneratorActions;

module.exports = Reflux.createStore({
	listenables: wordGeneratorActions,

	init: function () {
		this.isLoading = false;
	},
	getInitialState: function () {
		return this.isLoading;
	},
	updateState: function (isLoading) {
		this.isLoading = isLoading;
		this.trigger(isLoading);
	},

	onUpdateConfig: function (newConfig) {
		this.updateState(true);
	},
	onUpdateConfigCompleted: function (newWordGeneratorLoader) {
		this.updateState(false);
	},
	onUpdateConfigFailed: function (error) {
		this.updateState(false);
	}

});
