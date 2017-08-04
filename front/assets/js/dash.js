var dash = (function($, base=''){
    var opts = {base:base};

    function _get(o, url){
        if(!o){o={}}
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
    exports.getTertiaryCount = function(o={}){
        return _get(o, 'api/userCounts?tertiary=1');
    }
    exports.getResidentialCount = function(o={}){
        return _get(o, 'api/userCounts?residential=1');
    }
    exports.getTertiaryResidentialCount = function(o={}){
        return _get(o, 'api/userCounts?residential=1&tertiary=1');
    }
    return exports;
})(jQuery, '/');

console.log('OK');