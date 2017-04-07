// vue
import Vue from 'vue';
//Vue.config.debug = true;
//Vue.config.silent = true;

// vue-router
import VueRouter from 'vue-router';
import { configRouter } from './router/vue-router-config.js';
Vue.use(VueRouter);

const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

configRouter(router);

// http
import { http } from './services/http.js';
window.http = http;

// core lib
import nutsHub from './NutsHub.js';
window.nutsHub = nutsHub;

// Application
import App from './App.vue';

// utilities
import jToken from './utilities/JwtToken.js';
window.jwtToken = jToken;

import debug from './utilities/debug.js';
window.u = debug;

router.start(App, '#app');
