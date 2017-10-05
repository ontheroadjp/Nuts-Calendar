module.exports = {
    elements: {
        email: 'input#input-email',
        password: 'input#input-password',
        passwordConfirmation: 'input#input-password-confirmation',
        resetPasswordButton: 'button[type="submit"',
        loginLink: 'a[href="/login"]'
    },

    commands: [{
        resetPassword: function(email, password, pause = 3000) {
            console.log('   >> reset password to ' + password);
            return this.waitForElementPresent('@email', 1000)
                .clearValue('@email')
                .clearValue('@password')
                .clearValue('@passwordConfirmation')
                .setValue('@email', email)
                .setValue('@password', password)
                .setValue('@passwordConfirmation', password)
                .click('@resetPasswordButton')
                .pause(pause)
        },

        pause: function(time) {
            return this.api.pause(time);
        }
    }]
}
