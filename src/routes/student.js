const express = require("express");
const Router = express.Router();


/*
* student routes
*/

Router.get("/", function(req, res) {
	res.send("student index")
	// res.redirect(301, "/dashboard/students/list");
})

Router.get("/list", function(req, res) {
	res.send("student list");
})

Router.get("/new", function(req, res) {
	res.send("new student form");
})

Router.get("/graduated", function(req, res) {
	res.send("graduated student");
})

Router.post("/new", function(req, res) {
	res.send("create new student");
})

module.exports = Router;