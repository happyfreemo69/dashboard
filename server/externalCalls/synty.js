var https = require('https');
var http = require('http');

var exports = module.exports;
var config = require('../config');

var ctxHeaders = require('nodelibs')['network/headers']

/**
 * [userCounts description]
 * @param  {[type]} user [description]
 * @param  {{hommies}} opts in '0', '1'
 * @return {[type]}      [description]
 */
exports.userCounts = function(opts = {}){
    var httpModule = config.synty_pri_port == 443 ? https:http;
    var hommiesStr = '';
    if('hommies' in opts){
        hommiesStr = '?hommies='+opts.hommies;
    }
    return new Promise(function(resolve, reject){
        var req = httpModule.request({
            method:'get',
            path:'/v1/statUser/userCounts'+hommiesStr,
            hostname:config.synty_pri_host,
            headers:ctxHeaders.mergeIn({
                Authorization: 'bearer '+config.hot.statUserToken
            })
        }, function(res){
            res.on('data', function(chunk){
                if(res.statusCode != 200){
                    return reject(chunk.toString());
                }
                try{
                    var json = JSON.parse(chunk);
                    return resolve(json);
                }catch(e){
                    return reject(e);
                }
            });
        });
        req.on('error', reject);
        req.end();
    });
}
