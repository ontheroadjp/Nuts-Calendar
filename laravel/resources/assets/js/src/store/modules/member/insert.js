export default {
    namespaced: true,

    state: {
        isLoading: false,
        insertValues: {
            name: '',
            description: ''
        }
    },

    actions: {
        setInsertValue( { commit }, { key, value } ) {
            commit('setInsertValue', { key, value });
        },

        insert( { dispatch, commit, state } ) {
            u.clog('insert()');
            commit('isLoading', true);

            const url = '/api/v1/member';

            const params = {
                name: state.insertValues.name,
                description: state.insertValues.description
            };

            http.fetchPost(url, params)
                .then(response => {
                    u.clog('success');

                    const data = response.data;
                    data.isShow = true;

                    commit('member/add', {
                        id: data.id,
                        member: data
                    }, { root: true } );

                    commit('notifySuccess', {
                        content: 'success add member',
                        isImportant: false
                    }, { root: true });

                    commit('isLoading', false);
                    commit('reset');
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed add member',
                        isImportant: false
                    }, { root: true });

                    commit('isLoading', false);
                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        isLoading( state, value ) {
            state.isLoading = value;
        },

        setInsertValue( state, { key, value } ) {
            state.insertValues[key] = value;
        },

        reset( state ) {
            Object.keys(state.insertValues).forEach(function(key) {
                this[key] = '';
            }, state.insertValues );
        }
    }
};
