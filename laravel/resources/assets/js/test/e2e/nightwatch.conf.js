require('babel-register')
const config = require('../../config')
//const specsDir = 'test/e2e/tests';

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
    src_folders: ['test/e2e/tests'],
    output_folder: 'test/e2e/reports',
    custom_assertions_path: ['test/e2e/lib/assertions'],
    custom_commands_path: ['test/e2e/lib/commands'],
    page_objects_path: ['test/e2e/pages'],
    globals_path: 'test/e2e/globals.js',
    test_workers: {
        enabled: false,
        workers: "auto"
    },

    selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path,
            "webdriver.gecko.driver": require('geckodriver').path,
            "webdriver.ie.driver": ""
        }
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:8080',
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            screenshots : {
                enabled : true,
                on_failure : true,
                on_error : false,
                path : 'test/e2e/screenshots'
            },
            test_runner : {
                type : 'mocha',
                options : {
                    ui : 'bdd',
                    reporter : 'spec'
                }
            }
        },

        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
//                chromeOptions: {
//                    args: [ '--headless', '--disable-gpu' ]
//                }
            }
        },

        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        }
    }
}
