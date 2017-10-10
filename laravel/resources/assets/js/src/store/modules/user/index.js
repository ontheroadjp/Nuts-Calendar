//import Vue from 'vue';
//import insert from './insert.js';
//import update from './update.js';
//import remove from './remove.js';

const user = {
    namespaced: true,
    state: {
        data: {
            name: '',
            maxCalendars: 0,
            maxMembers: 0,
            maxSharedMembers: 0
        }
    },

    mutations: {
        init( state, user ) {
            state.data.name = user.name;
            state.data.maxCalendars = user.max_calendars;
            state.data.maxMembers = user.max_members;
            state.data.maxSharedMembers = user.max_shared_members;
        }
    },

//    modules: {
//        insert: insert,
//        update: update,
//        remove: remove
//    }
};
export default user;
