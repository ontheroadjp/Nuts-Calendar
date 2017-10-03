module.exports = {
    url: function() {
        return this.api.launch_url + '/me/settings/general';
    },

    elements: {

    },

    commands: [{
        pause: function(time) {
            return this.api.pause(time);
        }
    }]

};
