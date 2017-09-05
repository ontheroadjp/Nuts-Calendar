import Vue  from 'vue';
import Vuex from 'vuex';

import state        from './state.js';
import mutations    from './mutations.js';
import actions      from './actions.js';
import getters      from './getters.js';

// modules
import app                  from './modules/app/index.js';
import i18n                 from './modules/i18n/index.js';
import dashboard            from './modules/dashboard/index.js';
import userCalendar         from './modules/userCalendar/index.js';
import userCalendarMember   from './modules/userCalendarMember/index.js';
import calendar             from './modules/calendar/index.js';
import member               from './modules/member/index.js';
import item                 from './modules/item/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state,
    mutations,
    actions,
    getters,

    modules: {
//        app,
        i18n,
        dashboard,
        userCalendar,
        userCalendarMember,
        calendar,
        member,
        item
    }
})
