export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        editingItem: '',
        input: {
            content: '',
            startTime: '',
            endTime: ''
        }
    },

    actions: {
        prepare( { commit }, { editingItem } ) {
            u.clog('prepare()');
            commit('prepare', { editingItem } );
        },

        toggleTaskDone( { dispatch, commit } ) {
            commit('toggleTaskDone');
            dispatch('update');
        },

        setInputValues( { commit }, { content, startTime, endTime } ) {
            commit('setInputValues', { content, startTime, endTime } );
        },

        update( { state, commit } ) {
            commit('start');
            u.clog('update()');

            const url = '/api/v1/item/' + state.editingItem.id;
            const data = {
                member_id:  state.editingItem.member_id,
                date:       state.editingItem.date,
                is_done:    state.editingItem.is_done,

                content:    state.input.content,
                start_time: state.input.startTime,
                end_time:   state.input.endTime,
            };
    
            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    commit('update', {
                        content: response.data.content,
                        startTime: response.data.start_time,
                        endTime: response.data.end_time
                    });

                    commit('notifySuccess', {
                        content: 'success update task',
                        isImportant: false
                    }, { root: true });
        
                    commit('reset');
                })

                .catch( error => {
                    u.clog('failed');

                    commit('toggleTaskDone');
                    commit('notifyDanger', {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        prepare( state, { editingItem } ) {
            state.editingItem = editingItem;
            state.input.content = editingItem.content;
            state.input.startTime = editingItem.start_time;
            state.input.endTime = editingItem.end_time;
            state.isActive = true;
        },

        start( state ) {
            state.isLoading = true;
        },

        toggleTaskDone( state ) {
            state.editingItem.is_done = !state.editingItem.is_done;
        },

        setInputValues( state, { content, startTime, endTime } ) {
            state.input.content = content;
            state.input.startTime = startTime;
            state.input.endTime = endTime;
        },

        update( state, { content, startTime, endTime } ) {
            state.editingItem.content = content;
            state.editingItem.startTime = start_time;
            state.editingItem.endTime = end_time;
        },

        reset( state ) {
            state.isActive = false,
            state.isLoading = false,
            state.editingItem = '',
            state.input.content = '',
            state.input.startTime = '',
            state.input.endTime = ''
        }
    }
}
