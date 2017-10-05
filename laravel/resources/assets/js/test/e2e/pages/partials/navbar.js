module.exports = {
    launchUrl: function() {
        return this.api.launch_url;
    },

    elements: {
        homeLink: 'a[href="/"]',
        signinLink: 'a[href="/login"]',
        registerLink: 'a[href="/register"]',
        dashboardLink: 'a[href="/dashboard"]',
        userAccountDropdownLink: 'a#user-account-dropdown-menu',
        settingsLink: 'a#user-account-settings-menu-item',
        logoutLink: 'a#sign-out-menu-item',
    },

    commands: [{
        signout: function() {
            return this.waitForElementVisible('@userAccountDropdownLink', 1000)
            .click('@userAccountDropdownLink')
            .waitForElementVisible('@logoutLink', 3500)
            .click('@logoutLink')
            .pause(1000)
//            .assert.urlEquals('http://localhost:8080/')
        },

        pause: function(time) {
            return this.api.pause(time)
        }
    }]
};
