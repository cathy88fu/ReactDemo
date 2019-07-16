'use strict';
const publicUrl = 'dist';
function getClientEnvironment(envType){
    var NODE_ENV = {
        DEVELOPMENT: envType == 'development' ? JSON.stringify(true) : JSON.stringify(false),
        TESTING: envType == 'testing' ? JSON.stringify(true) : JSON.stringify(false),
        PRODUCTION: envType == 'production' ? JSON.stringify(true) : JSON.stringify(false),
    };
    return {publicUrl,NODE_ENV};
}

module.exports = getClientEnvironment;