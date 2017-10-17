import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';

const item = {
    namespaced: true,
    state: {
        data: {
            items: {}
        }
    },

    mutations: {
        init( state, items) {
            state.data.items = items;
        },

        add( state, { id, item } ) {
            Vue.set(state.data.items, id, item);
        },

        remove( state, { id } ) {
            Vue.delete(state.data.items, id);
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default item;

