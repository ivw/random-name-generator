var React = require('react');
var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');

var SiteTop = React.createClass({
	render: function () {
		return (
			<Navbar
				brand={"Random name generator"}
			>
			</Navbar>
		);
	}
});

module.exports = SiteTop;
