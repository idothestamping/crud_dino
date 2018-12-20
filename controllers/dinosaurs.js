var express = require('express');
var router = express.Router();
var fs = require('fs');
var dinoData = fs.readFileSync('views/dinos/dinosaurs.json');
dinoData = JSON.parse(dinoData);


// dinos index route
router.get('/', function(req, res){
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

// edit form route
router.get('/edit/:idx', function(req, res){
	res.render('dinos/edit', {dinoToEdit: dinoData[req.params.idx], dinoID: req.params.idx});
})

// delete dino route
router.delete('/:idx', function(req, res){
	//remove the dino from the dinoData array
	dinoData.splice(req.params.idx, 1);
	// save the new dinoData array to the json file
	fs.writeFileSync('views/dinos/dinosaurs.json', JSON.stringify(dinoData));
	res.redirect('/dinosaurs');
});

// edit dino route
router.put('/:idx', function(req, res){
	dinoData[req.params.idx].name = req.body.name;
	dinoData[req.params.idx].type = req.body.type;
})

// new dino form
router.get('/new', function(req, res){
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

// new dino route
router.post('/', function(req, res){
	console.log(req.body);
	//adding user input to the array
	dinoData.push(req.body);
	//save user input to the json file
	fs.writeFileSync('views/dinos/dinosaurs.json', JSON.stringify(dinoData));
	//redirect to the GET 
	res.redirect('/dinosaurs');
})


module.exports = router;
