var Reflux = require('reflux');

var listActions = ['add', 'remove', 'clear'];

module.exports.generatedWordsActions = Reflux.createActions(listActions);

module.exports.savedWordsActions = Reflux.createActions(listActions);

module.exports.wordGeneratorActions = {
	updateConfig: Reflux.createAction({asyncResult: true})
};
