import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';
import {
    INIT, ADD, REMOVE, SET_VALUE
} from '../../mutation-types.js';

const rrule = {
    namespaced: true,
    state: {
        data: {
            rrules: []
        }
    },

    mutations: {
        [INIT]( state, rrules) {
            state.data.rrules = rrules;
        },

        [ADD]( state, { id, rrule } ) {
            Vue.set(state.data.rrules, id, rrule);
        },

        [REMOVE]( state, { id } ) {
            Vue.delete(state.data.rrules, id);
        },

        [SET_VALUE]( state, { id, key, value } ) {
            const t = state.data.rrules[id];
            t[key] = value;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
};

export default rrule;
