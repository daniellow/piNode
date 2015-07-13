var http = require('http');
var express = require('express');

var app = express();

var inputs = [	{pin: '11', gpio: '17', value:1 },
		{pin: '12', gpio: '18', value:0 }];

//func = new instance.web.Model('model_name').get_func('on_off');

var sys = require('sys')
var exec = require('child_process').exec;
var child;

app.use(express['static']('/home/pi/myapp'));

app.get('/python', function(req,res) {
	child = exec("sudo python on_off.py", function (error, stdout, stderr) {
		res.status(200).send(stdout);
	});
});


app.get('/inputs/:id', function(req,res) {
	res.status(200).send(inputs[req.params.id]);
});

app.get('/ping', function(req, res) {
	res.status(200).send('success');
});

app.get('*', function(req, res) {
	res.status(404).send('Unrecognized API call');
});

app.use(function(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send('Oops, Something went wrong!');
	} else {
		next(err);
	}
});

app.listen(3001);
console.log('App Server running at port 3001');
