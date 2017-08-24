var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
  user: 'arunvramesh96',
  host: 'db.imad.hasura-app.io',
  database: 'arunvramesh96',
  password: 'db-arunvramesh96-28343',
  port: 5432,
};
var app = express();
function createHtml (data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmltemplate = `
        <html>
            <head>
                <title>
                   ${title}
                </title>
                <meta name="viewport" width="with-device-width,inital-scale-one"/> 
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            
            <body>
                <div class="container">
                    <div>
                        <a href="/">home</a>
                    </div>
                    <hr/>
                    <div>
                        <h1>${heading}</h1>
                    </div>
                    <div>
                        <h4>${date.toDateString()}</h4>
                    </div>
                    <div>
                        ${content}
                    </div>
                </div>
            </body>
        </html>`;
    return htmltemplate;
}
app.use(morgan('combined'));
app.use(bodyParser.json());

namel=[];
app.get('/name/', function (req,res) {
   var name=req.query.name;
   namel.push(name);
   res.send(JSON.stringify(namel));
});

var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});

function hash(input,salt){
    var byte=crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return ["pbkdf2Sync",10000,salt,byte.toString('hex')].join('$');
}

app.post('/create-user', function(req,res){
    var username = req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1,$2)',[username,dbString], function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else {
           res.send('user created' + username);
       }
   });
});

app.post('/log.html',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
     pool.query('SELECT * FROM "user" WHERE username = $1',[username], function(err,result){
         if(err){
           res.status(500).send(err.toString());
       } else {
           if(result.rows.length===0)
           {
               res.status(404).send('user not found');
           } else {
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword===dbString)
                {
                    res.send("User sucesfully loggeed in");
                }
                else{
                    res.send("incorrect username or password");
                }
           }
       }
    });
});

app.get('/hash/:string', function (req, res) {
    var hashedString=hash(req.params.string,'some-randon-string');
    res.send(hashedString);
    
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool=new Pool(config);
app.get('/article/:articlename', function(req,res){
    var articlename= req.params.articlename;
    pool.query("SELECT * from article where title= $1",[req.params.articlename], function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else {
           if(result.rows.length===0)
           {
               res.status(404).send('article not found');
           } else {
                var articledata=result.rows[0];
               res.send(createHtml(articledata));
           }
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80
var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
