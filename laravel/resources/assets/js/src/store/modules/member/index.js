import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';
import {
    INIT, ADD, REMOVE, SET_VALUE
} from '../../mutation-types.js';

const member = {
    namespaced: true,
    state: {
        data: {
            members: []
        }
    },

    mutations: {
        [INIT]( state, members) {
            state.data.members = members;
        },

        [ADD]( state, { id, member } ) {
            Vue.set(state.data.members, id, member);
        },

        [REMOVE]( state, { id } ) {
            Vue.delete(state.data.members, id);
        },

        [SET_VALUE]( state, { id, key, value } ) {
            const t = state.data.members[id];
            t[key] = value;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
};

export default member;
