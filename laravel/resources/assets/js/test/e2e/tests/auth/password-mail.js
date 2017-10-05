const axios = require('axios');

const changePassword = function(client, emailAddress, newPassword) {
    client.httpDelete('http://localhost:1080/messages', (response) => {
        const sendMailPage = client.page.auth['password-email']();
        const resetPage = client.page.auth['password-reset']();
        const loginPage = client.page.auth.login();
        const navbar = client.page.partials.navbar();

        sendMailPage.navigate()
            .sendMail(emailAddress)
            .assert.containsText('span#result-message', 'Sent Reset Link Mail Successfully');

        client.pause(1000);

        // fetch password reset link email
        client.httpGet('http://localhost:1080/messages/1.source', (response) => {
            const mailArray = response.data.split(/\r\n|\r|\n/);
            let mailData = {}
            mailArray.forEach((line) => {
                if(line.indexOf(': ') === -1) return;
                let key = line.split(':')[0].replace('-','').trim();
                let value = line.split(':')[1].trim();
                mailData[key] = value;
            });

            client.expect(mailData.From === 'admin <admin@familycal.com>').to.be.eql(true);
            client.expect(mailData.To === emailAddress).to.be.eql(true);
            client.expect(mailData.Subject === 'Your Password Reset Link').to.be.eql(true);
            client.expect(mailData.ContentType === 'text/html; charset=utf-8').to.be.eql(true);

            // move to password reset page (click text in an email)
            client
                .url(client.launch_url + '/password/reset/' + mailData.XToken)
                .pause(3000);

            // change password
            resetPage
                .resetPassword(emailAddress, newPassword, 3000)
                .assert.containsText('div#password-reset-result', 'Password reset successfully');

            // sign-in with new password
            loginPage.navigate()
                .signin(emailAddress, newPassword)
                .assert.urlEquals(client.launch_url + '/dashboard')
                .assert.elementNotPresent('a[href=/login]')
                .assert.elementPresent('div.container#dashboard')
                .pause(3000)

            navbar
                .signout();

        }, (error) => {
            console.log('Fetch mails from Mailcatcher: ' + error);
        });
    }, (error) => {
        console.log('Delete all emails on MailCatcher: ' + error);
    });
}

describe('/password-reset (send a reset e-mail)', () => {

    it('send e-mail and execute reset password', (client) => {
        changePassword(client, 'hoge@hoge.com', 'foofoo');

        changePassword(client, 'hoge@hoge.com', 'hogehoge');

        client.end();
    });
});
