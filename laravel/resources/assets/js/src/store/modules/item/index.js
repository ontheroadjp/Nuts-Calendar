import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';
import dnd from './dnd.js';
import {
    INIT, ADD, REMOVE, SET_VALUE
} from '../../mutation-types.js';

const item = {
    namespaced: true,
    state: {
        data: {
            items: {}
        }
    },

    mutations: {
        [INIT]( state, items) {
            Object.keys(items).forEach( (key) => {
                state.data.items[key] = items[key];
            });
        },

        [ADD]( state, { id, item } ) {
            u.clog('id: ' + id);
            u.clog('item: ' + item);
            Vue.set(state.data.items, id, item);
        },

        [REMOVE]( state, { id } ) {
            Vue.delete(state.data.items, id);
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove,
        dnd: dnd
    }
}
export default item;

