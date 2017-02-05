import fcRoot from '../pages/FcRoot.vue';
import fcLogin from '../pages/user/FcLogin.vue';
import fcRegister from '../pages/user/FcRegister.vue';
import fcPasswordEmail from '../pages/user/FcPasswordMail.vue';
import fcPasswordReset from '../pages/user/FcPasswordReset.vue';
import fcUserAccountSettings from '../pages/user/FcUserAccountSettings.vue';
import fcDashboard from '../pages/FcDashboard.vue';
import fcCalendar from '../pages/FcCalendar.vue';
import fcSettings from '../pages/FcSettings.vue';

export function configRouter (router) {
    router.map({
    
        '/': {
            component: fcRoot,
            auth: false
        },
        
        '/login': {
            component: fcLogin,
            auth: false
        },
        
        '/password/email': {
            component: fcPasswordEmail,
            auth: false
        },
        
        '/password/reset/:token': {
            component: fcPasswordReset,
            auth: false
        },
        
        '/register': {
            component: fcRegister,
            auth: false
        },
        
        '/me/settings': {
            component: fcUserAccountSettings,
            auth: true
        },
        
        '/dashboard': {
            component: fcDashboard,
            auth: true
        },
        
        '/calendar/:userCalendarId': {
            component: fcCalendar,
            auth: true
        },
        
        '/settings': {
            component: fcSettings,
            auth: true
        },
        
    });
}
