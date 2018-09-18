import root from '../pages/root.vue';
import login from '../pages/user/login/index.vue';
import register from '../pages/user/register.vue';
import passwordEmail from '../pages/user/password-mail.vue';
import passwordReset from '../pages/user/password-reset.vue';
import dashboard from '../pages/dashboard/index.vue';
import calendar from '../pages/calendar/index.vue';
import tableView from '../pages/calendar/table-view/index.vue';

export function init (router) {
//    mapping(router);
    registGuards(router);
    return router;
}

export const routes = [
    {
        path: '/',
        component: root,
        meta: {
            auth: false,
            navbar: {
                enable: false,
                logo: false,
                home: false,
                dashboard: false,
                userAcount: false,
                theme: false,
                lang: false,
                twitter: false
            },
            footer: false
        }
    },

    {
        path: '/login',
        component: login,
        meta: {
            auth: false,
            navbar: {
                enable: true,
                logo: true,
                home: true,
                dashboard: false,
                userAcount: false,
                theme: false,
                lang: false,
                twitter: false
            },
            footer: true
        }
    },

    {
        path: '/password/email',
        component: passwordEmail,
        meta: {
            auth: false,
            navbar: {
                enable: true,
                logo: false,
                home: false,
                dashboard: false,
                userAcount: false,
                theme: false,
                lang: false,
                twitter: false
            },
            footer: true
        }
    },

    {
        path: '/password/reset/:token',
        component: passwordReset,
        meta: {
            auth: false,
            navbar: {
                enable: true,
                logo: false,
                home: false,
                dashboard: false,
                userAcount: false,
                theme: false,
                lang: false,
                twitter: false
            },
            footer: true
        }
    },

    {
        path: '/register',
        component: register,
        meta: {
            auth: false,
            navbar: {
                enable: true,
                logo: false,
                home: false,
                dashboard: false,
                userAcount: false,
                theme: false,
                lang: false,
                twitter: false
            },
            footer: true
        }
    },

    {
        path: '/dashboard',
        component: dashboard,
        meta: {
            auth: true,
            navbar: {
                enable: true,
                logo: true,
                home: false,
                dashboard: false,
                userAcount: false,
                theme: true,
                lang: true,
                twitter: false
            },
            footer: true
        },
        children: [
            {
                path: ':type',
                component: dashboard,
                meta: {
                    auth: true,
                    navbar: {
                        enable: true,
                        logo: true,
                        home: false,
                        dashboard: false,
                        userAcount: false,
                        theme: false,
                        lang: false,
                        twitter: false
                    },
                    footer: true
                }
            }
        ]
    },

    {
        path: '/calendar',
        component: calendar,
        meta: {
            auth: true,
            navbar: {
                enable: true,
                logo: true,
                home: true,
                dashboard: false,
                userAcount: false,
                theme: false,
                lang: false,
                twitter: false
            },
            footer: true
        },
        children: [
            {
                path: 'view',
                component: tableView,
                meta: {
                    auth: true,
                    navbar: {
                        enable: true,
                        logo: true,
                        home: false,
                        dashboard: false,
                        userAcount: false,
                        theme: true,
                        lang: true,
                        twitter: false
                    },
                    footer: false
                }
            }
        ]
    }
];


function registGuards(router) {
    router.beforeResolve(function (to, from, next) {
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
    u.clog('handleNoLogedIn@vue-router-config');
    if(to.matched.some(record => record.meta.auth)) {
        next({path: '/login'});
    }
    u.clog('next()');
    next();
}

function handleAlreadyLogedIn(to, from, next, token) {
    u.clog('handleAlreadyLogedIn@vue-router-config');

    jwtToken.setLocalToken(token);

// temp
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
