var express = require('express');
var router = express.Router();
var fs = require('fs');
var dinoData = fs.readFileSync('views/dinos/dinosaurs.json');
dinoData = JSON.parse(dinoData);


router.get('/dinosaurs', function(req, res){
	var nameFilter = req.query.nameFilter;
	if(nameFilter){
		var filteredData = dinoData.filter(function(dino){
			return dino.name.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('dinos/dinosaurs', {myDinos: filteredData});
	} else {
			res.render('dinos/dinosaurs', {myDinos: dinoData});
	}
	console.log(req.query);
})


router.get('/dinosaurs/new', function(req, res){
	res.render('dinos/new');
})


//dino show route
router.get('/dinosaurs/:idx', function(req, res){
	if(req.params.idx < dinoData.length+1){
		res.render('dinos/show', {dino: dinoData[req.params.idx-1]})
	} else {
		res.send("We only have "+dinoData.length+" dinos at this");
	}
})


router.post('/dinosaurs', function(req, res){
	console.log(req.body);
	//adding user input to the array
	dinoData.push(req.body);
	//save user input to the json file
	fs.writeFileSync('views/dinos/dinosaurs.json', JSON.stringify(dinoData));
	//redirect to the GET 
	res.redirect('/dinosaurs');
})


module.exports = router;
