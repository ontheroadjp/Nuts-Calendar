describe('/login', () => {

//    it('success sign-in', (client) => {
//        const loginPage = client.page.auth.login();
//
//        loginPage.navigate()
//            .signin('hoge@hoge.com', 'hogehoge')
//            .assert.urlEquals(client.launch_url + '/dashboard')
//            .assert.elementNotPresent('a[href=/login]')
//            .assert.elementPresent('div.container#dashboard')
//        client.end()
//    });

    it('failed sign-in', (client) => {
        const loginPage = client.page.auth.login();

        // email: OK, pass: NG
        loginPage.navigate()
            .signin('hoge@hoge.com', 'badpassword')
            .assert.elementPresent('a[href="/login"]')
            .assert.elementNotPresent('div.containerdashboard')

        // email: NG, pass: OK
        loginPage.navigate()
            .signin('bad@bad.com', 'hogehoge')
            .assert.elementPresent('a[href="/login"]')
            .assert.elementNotPresent('div.containerdashboard')

        // email: NG, pass: NG
        loginPage.navigate()
            .signin('bad@bad.com', 'badpassword')
            .assert.elementPresent('a[href="/login"]')
            .assert.elementNotPresent('div.containerdashboard')

        client.end()
    });

//    it('forgot your password link', (client) => {
//        const loginPage = client.page.auth.login();
//        loginPage.navigate()
//            .click('@forgotYourPasswordLink')
//            .pause(1000)
//            .assert.elementPresent('div.container#password-mail')
//        client.end()
//    });
});
