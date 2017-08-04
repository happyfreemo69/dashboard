var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var domainMdw = require('express-domain-middleware');
var ctxMgr = require('nodelibs')['Mdw/contextManager']({logger:config.logger});
var context = require('nodelibs').context;
var reqLogger = require('nodelibs/')['Mdw/reqLogger'];
var app = exports = module.exports = express();
var querystring = require('querystring');
var ParamChecker = require('nodelibs').ParamChecker;
app.enable('trust proxy');
app.disable('x-powered-by');
app.enable('strict routing');
app.config = config;
app.use(domainMdw);
app.use(ctxMgr);
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next){
    context.set('pfx',req.headers.pfx);
    context.set('tid',req.headers.tid);
    context.set('sid',req.headers.sid);
    return next();
})
var synty = require('./externalCalls/synty');

app.use(reqLogger(config));
app.get('/api/userCounts*', function(req, res, next){
    var query = req.url.substring(req.url.indexOf('?')+1);
    return synty.userCounts(querystring.parse(query)).then(x=>{
        return res.status(200).send(x);
    })
})

app.get('/ping', function(req,res,next){
    return res.status(200).send('ok');
});

app.get('*', function(req,res,next){
    res.status(404).send('route '+req.url+'not found');
});

app.use(function(req, res, next){
    return res.status(500).send('FAILED');
});

if(!module.parent){
    app.listen(app.config.port, function(){
        console.info('http on '+app.config.port);
    });
}

module.exports = app;
