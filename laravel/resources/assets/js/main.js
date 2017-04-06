// vue
import Vue from 'vue';
//Vue.config.debug = true;
//Vue.config.silent = true;

// vue-router
import VueRouter from 'vue-router';
import { configRouter } from './router/vue-router-config.js';
Vue.use(VueRouter);

//const router = new VueRouter({
//    history: true,
//    saveScrollPosition: true
//});
//
//configRouter(router);

//// axios
//import axios from 'axios';
//axios.defaults.timeout = 2500;
//import { configAxios } from './http/axios-config.js';
//configAxios(axios);

// core lib
import nutsHub from './NutsHub.js';
window.nutsHub = nutsHub;

// Application
import App from './App.vue';

// temp
const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

// vue-router settings
configRouter(router);
// temp

//// utilities
//import jToken from './utilities/JwtToken.js';
//window.jwtToken = jToken;

import debug from './utilities/debug.js';
window.u = debug;

router.start(App, '#app');
