'use strict';

var pathModule = require('path');
var Logger = require('nodelibs').Logger;
/**
 * override this config in privateConfig.js for ... private details
 */
exports = module.exports;
exports.port = 4028;
exports.phase = 'dev';
exports.mode = 'dev';
exports.host = "http://127.0.0.1:"+exports.port;
exports.hostname = require('os').hostname();
exports.synty_url = 'https://synty-api-dev.citylity.com';
exports.hot = {};
exports.hot.http_logger = 0;
exports.hot.statUserToken = 'replace me';

exports.synty_pri_host = 'synty-api-usr.citylity.com';
exports.synty_pri_port = 80;
exports.hot.logLvl = exports.mode === 'prod';
exports.hot.logToConsole = false;
exports.hot.logMaxFileSize =5000000;
exports.hot.logLineMaxSize = 1e4;


exports.lgs_appName = 'dashboard';//maybe syntydev syntyuat
exports.hot.lgs_processTimeout = 1000;
exports.hot.lgs_maxBlockSize = 1e4;
exports.hot.lgs_minFullLength = 1e5;
exports.hot.lgs_unlockAfter = 5000;//retry 5seconds after if needed
exports.hot.lgs_tickEvery = 1000;



var res = require('fs').existsSync(__dirname+'/privateConfig.js') && require('./privateConfig.js');
for(var i in res){
    if(i=='hot'){
        for(var j in res.hot){
            exports[i][j] = res[i][j];
        }
    }else{
        exports[i] = res[i];
    }
}
exports.logger = exports.hot.http_logger == 0?
    new Logger({path: __dirname+'/../log/'}, exports.hot): exports.hot.http_logger == 1?
    new (Logger.http)({appName:exports.lgs_appName, host: exports.lgs_pri_host, port:exports.lgs_pri_port}, exports.hot):
    new (Logger.http2)({appName:exports.lgs_appName, host: exports.lgs_pri_host, port:exports.lgs_pri_port}, exports.hot)
