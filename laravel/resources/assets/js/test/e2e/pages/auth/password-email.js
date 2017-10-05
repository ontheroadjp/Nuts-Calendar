const sendMail = {
    sendMail: function (email, pause = 3000) {
        return this.waitForElementPresent('@email', 1000)
            .clearValue('@email')
            .setValue('@email', email)
            .click('@submitButton')
            .pause(pause)
    }
};

const pause = {
    pause: function(time) {
        return this.api.pause(time)
    }
}

module.exports = {
    url: function() {
        return this.api.launch_url + '/password/email';
    },

    elements: {
        email: 'input[type="email"]',
        signinLink: 'a[href="login"]',
        submitButton: 'button[type="submit"]',
        resultMessage: 'span#result-message'
    },

//    commands: [clearMailCatcher, sendMail, pause]
    commands: [sendMail, pause]
};
