export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
        remove( { commit, state }, { index } ) {
            u.clog('remove()');
            commit('isLoading', true);

            const url = '/api/v1/member/' + index;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('member/remove', { 
                        id: index 
                    }, { root: true });

                    commit('notifySuccess', {
                        content: 'success remove member',
                        isImportant: false
                    }, { root: true });

                    commit('isLoading', false);
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed remove member',
                        isImportant: false
                    }, { root: true });

                    commit('isLoading', false);
                });
        }
    },

    mutations: {
        isLoading( state, value ) {
            state.isLoading = value
        }
    }
}
