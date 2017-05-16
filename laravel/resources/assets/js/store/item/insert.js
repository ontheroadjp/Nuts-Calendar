export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        input: {
            name: ''
        }
    },

    actions: {
        prepare( { commit } ) {
            commit('prepare');
        },

        insert() {

        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        prepare( state ) {
            state.isActive = true;
        },

        start( state ) {
            state.isLoading = true;
        },

        insert( state ) {

        },

        reset( state ) {
            state.isActive = false;
            state.isLoading = false;
        }
    }
}
