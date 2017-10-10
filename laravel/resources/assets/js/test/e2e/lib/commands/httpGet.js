const util = require('util');
const events = require('events');

function httpGet () {}
util.inherits(httpGet, events.EventEmitter);

httpGet.prototype.command = function(url, success, failed) {
    const axios = require("axios");
    axios.get(url)
        .then(function(response) {
            success(response);
            this.emit('complete');
        }.bind(this))
        .catch(function(error) {
            failed(error);
            this.emit('eror');
        }.bind(this));
};

module.exports = httpGet;
