var http = require('http');
var express = require('express');
var gpio = require("rpi-gpio");

var app = express();

var inputs = [	{pin: '11', gpio: '17', value:1 },
		{pin: '12', gpio: '18', value:0 }];

gpio.setup(15, gpio.DIR_OUT, write);

function pause() {
	setTimeout(closePins, 2000);
}

function closePins() {
	gpio.destroy(function() {
		console.log('All pins unexported');
		return process.exit(0);
	});
}

function write() {
	gpio.write(15,true, function(err) {
		if (err) console.log(err);
		console.log('Written to pin');
	});
}

//func = new instance.web.Model('model_name').get_func('on_off');

app.use(express['static']('/home/pi/myapp'));

app.get('/inputs/:id', function(req,res) {
	res.status(200);
	write();
	pause();
	
	res.send(inputs[req.params.id]);
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

app.listen(3000);
console.log('App Server running at port 3000');
