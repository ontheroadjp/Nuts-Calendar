import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        calendars: '',
        columns: '',
        deletingColumn: ''
    },

    actions: {
        prepare( { commit, rootState }, { deletingColumn }  ) {
            const calendars = rootState.calendar.data.calendars;
            const columns = rootState.calendar.data.members;
            commit('prepare', { calendars, columns, deletingColumn } );
        },

        remove( { commit, state } ) {
            u.clog('remove()');
            commit('start');

            const url = '/api/v1/member/' + state.deletingColumn.id;
            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('remove');

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
        prepare( state, { calendars, columns, deletingColumn } ) {
            state.calendars = calendars,
            state.columns = columns,
            state.deletingColumn = deletingColumn
            state.isActive = true;
        },

        start( state ) {
            state.isLoading = true;
        },

        remove( state ) {
//            //state.columns.splice(state.deletingColumn.id, 1);
//            delete state.columns[state.deletingColumn.id];
//            state.calendars.forEach( function(val, index) {
//                delete val.items[state.deletingColumn.id];
//                //val.items.splice(state.deletingColumn, 1);
//            });

            Vue.delete(state.columns, state.deletingColumn.id);
            state.calendars.forEach( function(val, index) {
                Vue.delete( val.items, state.deletingColumn.id);
            });
        },

        finish( { state, commit }, { content, type, isImportant } ) {

        },

        reset( state ) {
            state.isActive = false,
            state.isLoading = false,
            state.calendars = '',
            state.columns = '',
            state.deletingColumn = ''
        }
    }
}
