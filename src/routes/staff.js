const express = require("express");
const Router = express.Router();

/*
* Staff routes
*/

Router.get("/", function(req, res) {
	// res.redirect(301, "/dashboard/staff/list");
	res.send("staff index")
})

Router.get("/list", function(req, res) {
	res.send("Staff list");
})

Router.get("/new", function(req, res) {
	res.send("new Staff form");
})

Router.post("/new", function(req, res) {
	res.send("create new Staff");
})


module.exports = Router;