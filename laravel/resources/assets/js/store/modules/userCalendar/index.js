import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';

const userCalendar = {
    namespaced: true,
    state: {
        data: {
            userCalendars: [],
        }
    },

    mutations: {
        init( state, userCalendars ) {
            state.data.userCalendars = userCalendars;
        },

        setValue( state, { id, key, value } ) {
            const t = state.data.userCalendars[id];
            t[key] = value
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default userCalendar;

