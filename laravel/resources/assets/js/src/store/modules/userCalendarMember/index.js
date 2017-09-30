import Vue from 'vue';
import insert from './insert.js';
import remove from './remove.js';

const member = {
    namespaced: true,

    state: {
        data: {
            userCalendarMembers: []
        }
    },

    mutations: {
        init( state, userCalendarMembers) {
            state.data.userCalendarMembers = userCalendarMembers;
        },

        add(state, { obj }) {
            const t = state.data.userCalendarMembers;
            Vue.set(t, t.length, obj);
        },

        remove(state, { obj }) {
            const t = state.data.userCalendarMembers;
            t.forEach( function(val, index) {
                if((val.user_calendar_id === obj.user_calendar_id)
                    && (val.member_id === obj.member_id)) {
                    Vue.delete(t, index);
                }
            });
        }
    },

    modules: {
        insert: insert,
        remove: remove
    }
};

export default member;
