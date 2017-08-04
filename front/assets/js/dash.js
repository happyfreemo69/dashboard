var dash = (function($, base=''){
    var opts = {base:base};

    function _get(o, url){
        if(!o){o={}}
            console.log('GOT ', $)
        return $.ajax({
            type: "GET",
            url: opts.base+url,
        }).catch(function(e){
            return Promise.reject(e);
        })
    }
    var exports = {};
    exports.getUserCounts = function(o={}){
        return _get(o, 'api/userCounts');
    }
    exports.getHommies = function(o={}){
        return _get(o, 'api/userCounts?hommies=1');
    }
    exports.getPersonals = function(o={}){
        return _get(o, 'api/userCounts?hommies=0');
    }
    return exports;
})(jQuery, '/');

console.log('OK');