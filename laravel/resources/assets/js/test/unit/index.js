import Vue from 'vue';

// ------------------------------------------------------------------
// vue global options
// see: https://jp.vuejs.org/v2/api/index.html
// ------------------------------------------------------------------
Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.config.errorHandler = function (err, vm, info) {
//    console.log('[vue(e)] ' + info);
}

Vue.config.warnHandler = function (msg, vm, trace) {
//    console.log('[vue(w)] ' + msg);
}

// ------------------------------------------------------------------
// global variables
// ------------------------------------------------------------------
import { utils } from '../../src/libs/utils.js';
window.u = utils;
u.setDebugMode(false)

//// jwt-token
//import { jwtToken } from '../../src/libs/jwt-token.js';
//window.jwtToken = jwtToken;

// http
import { http } from '../../src/libs/http.js';
window.http = http;
http.init();

//// event bus
//import { eventBus } from '../../src/libs/event.js';
//window.eventBus = eventBus;

// ------------------------------------------------------------------
// Test settings
// ------------------------------------------------------------------
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
