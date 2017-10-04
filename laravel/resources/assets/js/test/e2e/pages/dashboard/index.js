module.exports = {
    url: function() {
        return this.api.launch_url + '/dashboard'
    },

    elements: {
        pageId: 'div#dashboard',
        dashboard: 'div#dashboard',
        membersLink: 'a[href="/dashboard/members"'
    },

    commands: [{
        pause: function(time) {
            return this.api.pause(time)
        }
    }]
};

