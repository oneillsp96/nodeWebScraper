var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	//url = 'http://www.imdb.com/title/tt1229340/';
	  url = 'https://cringe.com/';

	request(url, function(error, response, html){
		if(!error){
			console.log("YO DIS SOME SHIT : " + html);
			var $ = cheerio.load(html);

			var shows = [];

			var json = {shows : []}; //arrray of objects, each object is a show

			for(var i = 0; i < 6; i++){
				shows.push({"date": $(".slides").find("h3").eq(i).text() })                     //create shows object and put in a date;
				shows[i].band = $(".slides").find("h3").eq(i).find("p").text()
			}
			json.shows = shows;
			

				

				//json.bands = 
			


			// $('.header').filter(function(){
		 //        var data = $(this);
		 //        title = data.children().first().text();
		 //        release = data.children().last().children().text();

		 //        json.title = title;
		 //        json.release = release;
	  //       })

	 //        $('.star-box-giga-star').filter(function(){
	 //        	var data = $(this);
	 //        	rating = data.text();

	 //        	json.rating = rating;
	 //        })


		 }  //end if(!error)

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 	