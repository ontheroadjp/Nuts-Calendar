const util = require('util');
const events = require('events');

function httpDelete () {}
util.inherits(httpDelete, events.EventEmitter);

httpDelete.prototype.command = function(url, success, failed) {
    const axios = require("axios");
    axios.delete(url)
        .then(function(response) {
            success(response);
            this.emit('complete');
        }.bind(this))
        .catch(function(error) {
            failed(error);
            this.emit('failed');
        }.bind(this))
};

module.exports = httpDelete;
