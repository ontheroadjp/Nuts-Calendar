import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';
import {
    INIT, ADD, REMOVE, SET_VALUE
} from '../../mutation-types.js';

const userCalendar = {
    namespaced: true,
    state: {
        data: {
            userCalendars: []
        }
    },

    mutations: {
        [INIT]( state, userCalendars ) {
            state.data.userCalendars = userCalendars;
        },

        [ADD]( state, { id, userCalendar } ) {
            Vue.set(state.data.userCalendars, id, userCalendar);
        },

        [REMOVE]( state, { id } ) {
            Vue.delete(state.data.userCalendars, id);
        },

        [SET_VALUE]( state, { id, key, value } ) {
            const t = state.data.userCalendars[id];
            t[key] = value;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
};
export default userCalendar;
