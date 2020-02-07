const express = require("express");
const Router = express.Router();

const staffRoutes = require("./staff");
const studentRoutes = require("./student");

function checkRole(req, res, next) {

}

Router.get("/", (req, res) => {
	res.send("dashboard");
})

Router.use("/staff", /*checkRole,*/ staffRoutes);
Router.use("/students", /*checkRole,*/ studentRoutes);

// Student route

/*

*/

// Admin route

/*
	Settings
	staff
		/list
		/new

	students
		/list
		/new
		/graduated
	SMS
	Results

	Payments
	Assignment
	Performances

	Operation
		import
		export
		manage card
		manage subject
		manage roles

	setings
		Promote
		session and Term (School fees, closing & resumption date)
			This term
			next term
			previous term

*/

module.exports = Router;