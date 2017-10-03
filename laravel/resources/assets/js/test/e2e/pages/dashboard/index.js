module.exports = {
    elements: {
        dashboard: '#dashboard',
        membersLink: 'a[href="/dashboard/members"'
    },

    commands: [{
        pause: function(time) {
            return this.api.pause(time)
        }
    }]
};

