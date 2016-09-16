var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/api/courrierstatus/:code', function(req, res) {
	var code = req.params.code;
	var parseString = require('xml2js').parseString;
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><consultaListaHawbArXML><usuario>webservice.avista</usuario><senha>123</senha><cliente_id></cliente_id><numEncCli></numEncCli><hawb>' + code + '</hawb></consultaListaHawbArXML>';

	var parser = require('xml2json');
	var request = require('request');

	request({
	    url: "http://www.flashpegasus.com.br/FlashOnline/rest/hawb/getconsultalistaAR/",
	    method: "POST",
	    headers: {
	        "content-type": "application/xml",
	    },
	    body: xml
	}, function (error, response, body){
		res.send(parser.toJson(body));
	});
});

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});
