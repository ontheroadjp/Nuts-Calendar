module.exports = {
    url: function() {
        return this.api.launch_url + '/me/settings/general';
    },

    elements: {
        pageId: 'div.container#user-account-settings-general'
    },

    commands: [{
        pause: function(time) {
            return this.api.pause(time);
        }
    }]

};
