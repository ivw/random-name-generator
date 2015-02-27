var React = require('react/addons');
var Reflux = require('reflux');
var WordGeneratorStore = require('../stores/WordGeneratorStore');
var _ = require('lodash');
var actions = require('../actions/actions');


var WordGeneratorConfig = React.createClass({
	mixins: [
		Reflux.listenTo(WordGeneratorStore, "onWordGeneratorChange"),
		React.addons.LinkedStateMixin
	],
	getInitialState: function () {
		return WordGeneratorStore.getConfig() || WordGeneratorStore.defaultConfig;
	},
	onWordGeneratorChange: function () {
		this.setState(WordGeneratorStore.getConfig());
	},
	handleSubmit: function (e) {
		e.preventDefault();

		try {
			actions.wordGeneratorActions.updateConfig.triggerPromise(this.state)
				.then(function () {
					actions.generatedWordsActions.clear();
				})
				.catch(function (error) {
					// something went wrong while loading the new word generator

					console.warn(error);

					alert(error);
				});
		} catch (error) {
			// something wrong with the given config

			console.warn(error);

			alert(error);
		}
	},
	handleCancel: function (e) {
		e.preventDefault();

		this.setState(WordGeneratorStore.getConfig());
	},
	render: function () {
		var isConfigUnchanged = _.isEqual(this.state, WordGeneratorStore.getConfig());

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="word-generator-config">
						<form className="form-inline" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label>Source words:</label>
								<select className="form-control" valueLink={this.linkState('sourceWordsUrl')}>
									<option value="/wordlists/wordsEnglish.txt">English</option>
									<option value="/wordlists/wordsSpanish.txt">Spanish</option>
									<option value="/wordlists/wordsFrench.txt">French</option>
									<option value="/wordlists/wordsGerman.txt">German</option>
									<option value="/wordlists/wordsItalian.txt">Italian</option>
									<option value="/wordlists/wordsDutch.txt">Dutch</option>
									<option value="/wordlists/wordsLatin.txt">Latin</option>
								</select>
							</div>

							<div className="form-group">
								<label>Starts with:</label>
								<input type="text" className="form-control input-tiny" size="2" valueLink={this.linkState('wordStartsWith')} />
							</div>

							<div className="form-group">
								<label>Randomness:</label>
								<select className="form-control" valueLink={this.linkState('chainOrder')}>
									<option value="1">1 (more random)</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4 (more like normal words)</option>
								</select>
							</div>

							<div className="form-group">
								<label>Length:</label>

								<div className="input-group input-medium">
									<input type="number" className="form-control" min="1" max="50" valueLink={this.linkState('minWordLength')} />

									<div className="input-group-addon">-</div>

									<input type="number" className="form-control" min="1" max="50" valueLink={this.linkState('maxWordLength')} />
								</div>
							</div>

							<div className="form-group">
								<button type="submit" className="btn btn-default">Update</button>
								<button type="button" className="btn btn-default" onClick={this.handleCancel} disabled={isConfigUnchanged}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = WordGeneratorConfig;
