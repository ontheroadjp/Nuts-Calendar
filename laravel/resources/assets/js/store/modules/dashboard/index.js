import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        currentId: 0,
//        data: {
//            userCalendarMembers: [],
//        }
    },

    mutations: {
        setCurrentId(state, { id }) {
            state.currentId = id
        }
    }
}
