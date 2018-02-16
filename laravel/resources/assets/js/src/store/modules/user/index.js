//import Vue from 'vue';
//import insert from './insert.js';
//import update from './update.js';
//import remove from './remove.js';

const user = {
    namespaced: true,
    state: {
        data: {
            user: {},
            name: '',
            userPlan: {}
        }
    },

    mutations: {
        init( state, {user, userPlan} ) {
            state.data.user = user;
            state.data.name = user.name;
            state.data.userPlan = userPlan[user.userplan_id];
        }
    },

//    modules: {
//        insert: insert,
//        update: update,
//        remove: remove
//    }
};
export default user;
