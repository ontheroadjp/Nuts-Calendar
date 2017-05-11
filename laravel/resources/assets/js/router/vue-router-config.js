import root from '../pages/root.vue';
import login from '../pages/user/login.vue';
import register from '../pages/user/register.vue';
import passwordEmail from '../pages/user/password-mail.vue';
import passwordReset from '../pages/user/password-reset.vue';
import userAccountSettings from '../pages/user/settings/index.vue';
import calendar from '../pages/calendar/index.vue';
import dashboard from '../pages/calendar/dashboard/index.vue';
import tableView from '../pages/calendar/table-view/index.vue';
import calendarSettings from '../pages/calendar/settings/index.vue';

export function init (router) {
//    mapping(router);
    beforRooting(router);
    return router;
}

export const routes = [
    {
        path: '/',
        component: root,
        auth: false,
        footer: false
    },
    
    {
        path: '/login',
        component: login,
        auth: false,
        footer: true
    },

    { 
        path: '/password/email',
        component: passwordEmail,
        auth: false,
        footer: true
    },
    
    {
        path: '/password/reset/:token',
        component: passwordReset,
        auth: false,
        footer: true
    },

    { 
        path: '/register',
        component: register,
        auth: false,
        footer: true
    },

    { 
        path: '/me/settings/:type',
        component: userAccountSettings,
        auth: true,
        footer: true
    },

    { 
        path: '/calendar',
        component: calendar,
        auth: true,
        footer: true,
        children: [
            {
                path: '',
                component: dashboard,
                auth: true,
                footer: false,
            },
            {
                path: 'view',
                component: tableView,
                auth: true,
                footer: false,
            },
            {
                path: 'settings/:type',
                component: calendarSettings,
                auth: true,
                footer: false,
            },
        ]
    },
];


function beforRooting(router){
//    router.beforeEach(function (transition) {
//        u.clog( '------- ' + transition.to.path + ' -------' );
//        const token = jwtToken.getLocalToken();
//        if(! token) {
//            handleNoLogedIn(transition);
//            return;
//        }
//        handleAlreadyLogedIn(transition, token);
//    });
    router.beforeEach(function (to, from, next) {
        u.clog( '------- ' + to.path + ' -------' );
        const token = jwtToken.getLocalToken();
        if(! token) {
            handleNoLogedIn(to, from, next);
            return;
        }
        handleAlreadyLogedIn(to, from, next, token);
    });
}
            
function handleNoLogedIn(to, from, next) {
//    u.clog('handleNoLogedIn@app.vue');
//    if(transition.to.auth) {
//        transition.redirect('/login');
//    }
//    //this.$store.commit('logout');
//    u.clog('transition.next()');
//    transition.next();

    u.clog('handleNoLogedIn@app.vue');
    if(to.matched.some(record => record.meta.auth)) {
        next({path: '/login'});
    }
    //this.$store.commit('logout');
    u.clog('next()');
    next();
}
            
function handleAlreadyLogedIn(to, from, next, token) {
//    u.clog('handleAlreadyLogedIn@app.vue');
//
//    jwtToken.setLocalToken(token);
//
//    //temp
////    if(localStorage.getItem('rememberMe')) {
////        u.clog('REMEMBER ME - true!!!');
////        localStorage.setItem('rememberMe', token);
////    }
//
//    if(transition.to.path === '/login') {
//        transition.redirect('/dashboard');
//    }
//
//    u.clog('transition.next()');
//    transition.next();

    u.clog('handleAlreadyLogedIn@app.vue');

    jwtToken.setLocalToken(token);

    //temp
//    if(localStorage.getItem('rememberMe')) {
//        u.clog('REMEMBER ME - true!!!');
//        localStorage.setItem('rememberMe', token);
//    }

    if(to.path === '/login') {
        return next({path: '/dashboard'});
    }

    u.clog('next()');
    next();
}
