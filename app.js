/* 
* Module dependencies
*/ 

var express = require('express');
var stylus = require('stylus');
var nib = require ('nib');


var app = express();

function compile(str, path){
	return stylus(str)
	.set('filename',path)
	.use(nib())
}

/* 
* Tells Express want to use Jade and where we will keep "views" folder
*/ 

app.set('views', __dirname + '/views') 
app.set('view engine', 'jade')



/* Next, the Stylus middleware is applied, which will compile our .styl
files to CSS - use custom compile function in order to use nib*/
app.use(stylus.middleware(   { src: __dirname + '/public'   ,
compile: compile   } )) 

/* Express static middleware is used for serving static files --  tell it that our static files will live in a folder called 'public', */
app.use(express.static(__dirname + '/public'))



/*
 The functionres.render() is provided by Express and takes the name of the view to render, 
 *followed by an object whose properties the view will have access to 
*/
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})



app.listen(3000) //tells express app to listen on port 3000





