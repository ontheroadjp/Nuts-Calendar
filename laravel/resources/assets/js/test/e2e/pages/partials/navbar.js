module.exports = {
    launchUrl: function() {
        return this.api.launch_url;
    },

    elements: {
        homeLink: 'a[href="/"]',
        signinLink: 'a[href="/login"]',
        registerLink: 'a[href="/register"]',
        dashboardLink: 'a[href="/dashboard"]',
        userAccountDropdownLink: 'a[href="#user-account-dropdown-menu"]',
        userAccountSettingsLink: 'a[href="/me/settings/general"]',
        logoutLink: 'a[href="signout"]',
    },

    commands: [{
        pause: function(time) {
            return this.api.pause(time)
        }
    }]
};
