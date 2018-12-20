var express = require('express');
var router = express.Router();
var fs = require('fs');
var prehistoric_creaturesData = fs.readFileSync('views/creatures/prehistoric_creatures.json');
prehistoric_creaturesData = JSON.parse(prehistoric_creaturesData);


router.get('/', function(req, res){
		res.render('prehistoric_creatures');
});

router.get('/prehistoric_creatures', function(req, res){
	var nameFilter = req.query.nameFilter;
	if(nameFilter){
		var filteredData = prehistoric_creaturesData.filter(function(prehist){
			return prehist.type.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('creatures/prehistoric_creatures', {myPrehist: filteredData});
	} else {
			res.render('creatures/prehistoric_creatures', {myPrehist: prehistoric_creaturesData});
	}
	console.log(req.query);
})


router.get('/prehistoric_creatures/edit', function(req, res){
	res.render('creatures/edit');
})


router.get('/prehistoric_creatures/:idx', function(req, res){
	if(req.params.idx < prehistoric_creaturesData.length+1){
		res.render('creatures/show2', {prehist: prehistoric_creaturesData[req.params.idx-1]})
	} else {
		res.send("We only have "+prehistoric_creaturesData.length+" prehistoric_creatures at this");
	}
})


//need help for POST

// router.post('/prehistoric_creatures/edit/:idx', function(req, res){
// 	//console.log(req.body);
// 	//adding user input to the array
// 	prehistoric_creaturesData.push(req.body);
// 	//save user input to the json file
// 	fs.writeFileSync('views/creatures/prehistoric_creatures.json', JSON.stringify(prehistoric_creaturesData));
// 	//redirect to the GET 
// 	res.redirect('/prehistoric_creatures');
// })


module.exports = router;