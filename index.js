var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
// var fs = require('fs');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body parser middleware
app.use(express.urlencoded({extended: false}));

//dino home route
app.get('/', function(req, res){
	res.send("add to URL .../dinosaurs and .../prehistoric_creatures");
	// res.render('');
	console.log(dinoData);
});

app.use(require('./controllers/dinosaurs'));
app.use('/dinosaurs/new', require('./controllers/dinosaurs'));
app.use('/dinosaurs/:idx', require('./controllers/dinosaurs'));

app.use(require('./controllers/prehistoric_creatures'));
app.use('/prehistoric_creatures/edit', require('./controllers/prehistoric_creatures'));
app.use('/prehistoric_creatures/edit/:idx', require('./controllers/prehistoric_creatures'));

app.listen(8000);