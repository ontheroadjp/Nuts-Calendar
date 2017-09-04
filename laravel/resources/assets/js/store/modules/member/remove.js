export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
        remove( { commit, state }, { index } ) {
            u.clog('remove()');
            commit('start');

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

                    commit('stop');
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed remove member',
                        isImportant: false
                    }, { root: true });

                    commit('stop');
                });
        }
    },

    mutations: {
        start( state ) {
            state.isLoading = true;
        },

        stop( state ) {
            state.isLoading = false;
        }
    }
}
