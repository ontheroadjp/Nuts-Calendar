module.exports = {
    url: function() {
        return this.api.launch_url + '/login';
    },

    elements: {
        email: 'input[type="email"]',
        password: 'input[type="password"]',
        forgotYourPasswordLink: '#forgot-your-password-link',
        submitButton: '#sign-in-button',
        registerLink: 'a[href="/register"]',
    },

    commands: [{
        signin: function (email, password, pause=3000) {
            return this.waitForElementPresent('@email', 3000)
                .clearValue('@email')
                .clearValue('@password')
                .setValue('@email', email)
                .setValue('@password', password)
                .click('@submitButton')
                .pause(pause)
        },

        pause: function(time) {
            return this.api.pause(time)
        }
    }]
};
