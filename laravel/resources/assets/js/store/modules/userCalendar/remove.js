export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
        remove( { commit, state }, { id, notify, successCb, failedCb } ) {
            u.clog('remove()');
            commit('isLoading', true);

            const url = '/api/v1/calendar/' + id;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    u.clog('00');
                    commit('userCalendar/remove', {
                        id: id
                    }, { root: true });

                    u.clog('01');
                    if( notify !== false ) {
                        commit('notifySuccess', {
                            content: 'success remove member',
                            isImportant: false
                        }, { root: true });
                    }

                    u.clog('02');
                    if( typeof successCb === 'function' ) {
                        successCb();
                    }

                    u.clog('03');
                    commit('isLoading', false);
                })

                .catch(error => {
                    u.clog('failed');

                    if( notify !== false ) {
                        commit('notifyDanger', {
                            content: 'failed remove member',
                            isImportant: false
                        }, { root: true });
                    }

                    if( typeof failedCb === 'function' ) {
                        failedCb();
                    }

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
