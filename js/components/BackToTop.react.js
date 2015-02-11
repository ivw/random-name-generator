var React = require('react');

function getState() {
	return {
		visible: window.pageYOffset > 300
	};
}

var BackToTop = React.createClass({
	getInitialState: function () {
		return getState();
	},
	_onChange: function () {
		this.setState(getState());
	},
	componentDidMount: function () {
		window.addEventListener('scroll', this._onChange);
	},
	componentWillUnmount: function () {
		window.removeEventListener('scroll', this._onChange);
	},
	handleClick: function (e) {
		e.preventDefault();

		window.scrollTo(0, 0);
	},
	render: function () {
		var style = {};
		if (!this.state.visible) {
			style.display = 'none';
		}

		return (
			<a href="javascript:;" className="back-to-top-button" style={style} onClick={this.handleClick}></a>
		);
	}
});

module.exports = BackToTop;
