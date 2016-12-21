//import Vue from 'vue';
//import Vuex from 'vuex';

//Vue.use(Vuex);

const now = new Date();

const state = {
    mainIndex: 0,
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
}

const mutations = {
    setMainIndex( state, val ) {
        state.mainIndex = val;
    },

    setCurrentYear( state, val ) {
        state.currentYear = val;
    },

    setCurrentMonth( state, val ) {
        state.currentMonth = val;
    },
}


export default new Vuex.Store({
    state,
    mutations
})
