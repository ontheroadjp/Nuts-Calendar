export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        editingItem: '',
        clickX: 0,
        clickY: 0,
        input: {
            content: '',
            startTime: '',
            endTime: ''
        }
    },

    actions: {
        prepare( { commit }, { event, editingItem } ) {
            u.clog('prepare()');
            commit('prepare', { event, editingItem } );
        },

        prepareModal( { commit }, { event } ) {
            u.clog('prepareModal()');
            commit('prepareModal', { event } );
        },

        toggleTaskDone( { dispatch, commit } ) {
            commit('toggleTaskDone');
            dispatch('update');
        },

//        setInputValues( { commit }, { content, startTime, endTime } ) {
//            commit('setInputValues', { content, startTime, endTime } );
//        },

        update( { state, commit } ) {
//            commit('start');
            commit('isLoading', true);
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
        
//                    commit('stop');
                    commit('isLoading', false);
                })

                .catch( error => {
                    u.clog('failed');

                    commit('toggleTaskDone');
                    commit('notifyDanger', {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

//                    commit('stop');
                    commit('isLoading', false);
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
        },

        prepareModal( state, { event } ) {
            state.clickX = event.pageX;
            state.clickY = event.pageY;
            state.isActive = true;
        },

        isLoading( state, { value } ) {
            state.isLoading = value;
        },

//        start( state ) {
//            state.isLoading = true;
//        },

        toggleTaskDone( state ) {
            state.editingItem.is_done = !state.editingItem.is_done;
        },

//        setInputValues( state, { content, startTime, endTime } ) {
//            state.input.content = content;
//            state.input.startTime = startTime;
//            state.input.endTime = endTime;
//        },

        update( state, { content, startTime, endTime } ) {
            state.editingItem.content = content;
            state.editingItem.start_time = startTime;
            state.editingItem.end_time = endTime;
        },

//        stop( state ) {
//            state.isLoading = false;
//        },

        reset( state ) {
            state.isActive = false,
            state.editingItem = '',
            state.isLoading = false,
            state.input.content = '',
            state.input.startTime = '',
            state.input.endTime = ''
        }
    }
}
