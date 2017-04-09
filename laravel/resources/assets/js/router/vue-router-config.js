import root from '../pages/root.vue';
import login from '../pages/user/login.vue';
import register from '../pages/user/register.vue';
import passwordEmail from '../pages/user/password-mail.vue';
import passwordReset from '../pages/user/password-reset.vue';
import userAccountSettings from '../pages/user/settings/index.vue';
import calendar from '../pages/calendar/index.vue';
import tableView from '../pages/calendar/table-view/index.vue';
import dashboard from '../pages/calendar/dashboard/index.vue';
import calendarSettings from '../pages/calendar/settings/index.vue';
//import settingsCalendar from '../pages/calendar/settings/calendar.vue';
//import settingsMembers from '../pages/calendar/settings/members.vue';
//import settingsItems from '../pages/calendar/settings/items.vue';

export function init (router) {
    mapping(router);
    beforRooting(router);
    return router;
}

function mapping(router) {
    router.map({
    
        '/': {
            component: root,
            auth: false,
            footer: false
        },
        
        '/login': {
            component: login,
            auth: false,
            footer: true
        },
        
        '/password/email': {
            component: passwordEmail,
            auth: false,
            footer: true
        },
        
        '/password/reset/:token': {
            component: passwordReset,
            auth: false,
            footer: true
        },
        
        '/register': {
            component: register,
            auth: false,
            footer: true
        },
        
        '/me/settings/:type': {
            component: userAccountSettings,
            auth: true,
            footer: true
        },
        
        '/calendar': {
            component: calendar,
            auth: true,
            footer: true,
            subRoutes: {
                '/': {
                    component: dashboard,
                    auth: true,
                    footer: false,
                },
                '/view': {
                    component: tableView,
                    auth: true,
                    footer: false,
                },
                '/settings/:type': {
                    component: calendarSettings,
                    auth: true,
                    footer: false,
                },
            }
        },
    });
}

function beforRooting(router){
    router.beforeEach(function (transition) {
        u.clog( '------- ' + transition.to.path + ' -------' );
        const token = jwtToken.getLocalToken();
        if(! token) {
            handleNoLogedIn(transition);
            return;
        }
        handleAlreadyLogedIn(transition, token);
    });
}
            
function handleNoLogedIn(transition) {
    u.clog('handleNoLogedIn@app.vue');
    if(transition.to.auth) {
        transition.redirect('/login');
    }
    //this.$store.commit('logout');
    u.clog('transition.next()');
    transition.next();
}
            
function handleAlreadyLogedIn(transition, token) {
    u.clog('handleAlreadyLogedIn@app.vue');

    jwtToken.setLocalToken(token);

    //temp
//    if(localStorage.getItem('rememberMe')) {
//        u.clog('REMEMBER ME - true!!!');
//        localStorage.setItem('rememberMe', token);
//    }

    if(transition.to.path === '/login') {
        transition.redirect('/dashboard');
    }

    u.clog('transition.next()');
    transition.next();
}
