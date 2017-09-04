import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
        remove( { commit, state, rootState }, { index } ) {
            u.clog('remove()');
            commit('start');

            const members = rootState.member.data.members;

            const url = '/api/v1/member/' + members[index].id;
            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('remove', { members, index });

                    commit('notifySuccess', {
                        content: 'success remove member',
                        isImportant: false
                    }, { root: true } );

                    commit('reset');
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed remove member',
                        isImportant: false
                    }, { root: true });

                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        start( state ) {
            state.isLoading = true;
        },

        remove( state, { members, index } ) {
            Vue.delete(members, index);
        },

        reset( state ) {
            state.isLoading = false;
        }
    }
}
