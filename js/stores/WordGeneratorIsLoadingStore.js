var Reflux = require('reflux');
var wordGeneratorActions = require('../actions/actions').wordGeneratorActions;

module.exports = Reflux.createStore({
	init: function () {
		this.listenTo(wordGeneratorActions.updateConfig, 'onUpdateConfig');
		this.listenTo(wordGeneratorActions.updateConfig.completed, 'onUpdateConfigCompleted');
		this.listenTo(wordGeneratorActions.updateConfig.failed, 'onUpdateConfigFailed');

		this.isLoading = false;
	},
	updateState: function (isLoading) {
		this.isLoading = isLoading;
		this.trigger(isLoading);
	},
	getInitialState: function () {
		return this.isLoading;
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
