describe('navbar', function() {
    describe('when not loged in yet', function() {
        it('Home', function(client) {
            const navbar = client.page.partials.navbar();
            client
                .url(client.launch_url + '/login')

            navbar
                .click('@homeLink')
                .pause(3000)
                .assert.elementPresent('div.container#home')
            client.end()
        });

        it('Sign-in', function(client) {
            const navbar = client.page.partials.navbar();
            client
                .url(client.launch_url)

            navbar
                .click('@signinLink')
                .pause(3000)
                .assert.elementPresent('div.container#sign-in')
            client.end()
        });

        it('Register', function(client) {
            const navbar = client.page.partials.navbar();
            client
                .url(client.launch_url)

            navbar
                .click('@registerLink')
                .pause(3000)
                .assert.elementPresent('div.container#user-registration')
            client.end()
        });
    });

    describe('when already loged in', function() {
        it('Home', function(client) {
            const loginPage = client.page.auth.login();
            const navbar = client.page.partials.navbar();

            loginPage.navigate()
                .signin('hoge@hoge.com', 'hogehoge')
                .assert.urlEquals(client.launch_url + '/dashboard')

            navbar
                .click('@homeLink')
                .pause(1000)
                .assert.urlEquals(client.launch_url + '/')
                .assert.elementPresent('div.container#home')

            client.end()
        });

        it('dashboard', function(client) {
            const loginPage = client.page.auth.login();
            const dashboardPage = client.page.dashboard.index();
            const navbar = client.page.partials.navbar();

            loginPage.navigate()
                .signin('hoge@hoge.com', 'hogehoge')
                .assert.urlEquals(dashboardPage.url())

            dashboardPage
                .click('@membersLink')
                .assert.urlEquals(client.launch_url + '/dashboard/members')

            navbar
                .click('@dashboardLink')
                .pause(1000)
                .assert.elementPresent('div.container#dashboard')

            client.end()
        });

        it('user account dropdown menu: user account settings', function(client) {
            const loginPage = client.page.auth.login();
            const dashboardPage = client.page.dashboard.index();
            const navbar = client.page.partials.navbar();
            const generalSettingsPage = client.page.auth.settings.general();

            loginPage.navigate()
                .signin('hoge@hoge.com', 'hogehoge')
                .assert.urlEquals(dashboardPage.url())

            navbar
                .click('@userAccountDropdownLink')
                .waitForElementVisible('@settingsLink', 5000)
                .click('@settingsLink')

            generalSettingsPage
                .waitForElementVisible('@pageId', 5000)
                .assert.urlEquals(generalSettingsPage.url())

            client.end()
        });

        it('user account dropdown menu: logout', function(client) {
            const loginPage = client.page.auth.login();
            const dashboardPage = client.page.dashboard.index();
            const navbar = client.page.partials.navbar();

            loginPage.navigate()
                .signin('hoge@hoge.com', 'hogehoge')
                .assert.urlEquals(dashboardPage.url())

            navbar
                .click('@userAccountDropdownLink')
                .waitForElementVisible('@logoutLink', 5000)
                .click('@logoutLink')
                .pause(1000)
                .assert.urlEquals(client.launch_rul)

            client.end()
        });

    });
});
