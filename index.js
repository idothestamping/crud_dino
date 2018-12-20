var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
// var fs = require('fs');


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(methodOverride('_method'));
//body parser middleware
app.use(express.urlencoded({extended: false}));

//dino home route

app.use('/dinosaurs', require('./controllers/dinosaurs'));
// app.use('/dinosaurs/new', require('./controllers/dinosaurs'));
// app.use('/dinosaurs/:idx', require('./controllers/dinosaurs'));

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));
// app.use('/prehistoric_creatures/edit', require('./controllers/prehistoric_creatures'));
// app.use('/prehistoric_creatures/edit/:idx', require('./controllers/prehistoric_creatures'));

app.get('/', function(req, res){
	res.send("You hit the home route!");
})


app.listen(8000);