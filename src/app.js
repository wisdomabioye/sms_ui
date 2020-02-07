const express = require("express");
const app = express();

const path = require("path"), 
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	cors = require("cors"),
	helmet = require("helmet"),
	compression = require("compression"),
	csurf = require("csurf");

/*
* Storage and session
*/
const mongoose = require("mongoose"),
	passport = require("passport"),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session);

// mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

/*
* View engine
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/*
* setup middleware
*/
app.use(express.static(path.join(__dirname, "public")));
/*app.use(session({
	secret: "school_mgmt_system",
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	resave: false,
	saveUninitialized: false,
}));*/
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

/*
* Naked domain only
* https://www.xpl.com to https://xpl.com
* Good for SEO optimization
*/

function wwwRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
};

/*
* Protect Authenticated Route
*/
function isUserAuthenticated(req, res, next){
    if(req.user){
        next();
    }else{
        res.redirect('/login')
    }
}


const environment = process.env.NODE_ENV;
const publicRoute = require("./routes/public");
const authenticatedRoute = require("./routes/dashboard");

app.use(wwwRedirect);
app.use("/", publicRoute);
app.use("/dashboard", /*isUserAuthenticated,*/ authenticatedRoute);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    res.status(404);
    var err = new Error("Not found");
    next(err);
});


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        error: environment == "development" ? err : {}
    });
});

module.exports = app;