var React = require('react');
var Navbar = require('react-bootstrap/Navbar');
//var Nav = require('react-bootstrap/Nav');
//var NavItem = require('react-bootstrap/NavItem');

var SiteTop = React.createClass({
	render: function () {
		var header = <span>Random name generator
			<a href="//github.com/ivw/random-name-generator" target="_blank">
				<i className="fa fa-github fa-lg"></i>
			</a>
		</span>;
		return (
			<Navbar
				brand={header}
			>
			</Navbar>
		);
	}
});

module.exports = SiteTop;
