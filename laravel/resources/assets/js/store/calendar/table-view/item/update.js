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

        updateContent( { dispatch, commit }, { value } ) {
            commit('updateContent', { value });
            dispatch('update');
        },

        updateTimeRange( { dispatch, commit }, { start, end } ) {
            commit('updateTimeRange', { startTime: start, endTime: end } );
            dispatch('update');
        },

        update( { state, commit } ) {
            commit('start');
            u.clog('update()');

            const url = '/api/v1/item/' + state.editingItem.id;
            const data = {
                member_id: state.editingItem.member_id,
                content: state.editingItem.content,
                date: state.editingItem.date,
                start_time: state.editingItem.start_time,
                end_time: state.editingItem.end_time,
                is_done: state.editingItem.is_done,
            };
    
            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

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

//        update( { commit }, { item } ) {
//            u.clog('update()');
//
//            const url = '/api/v1/item/' + item.id;
//            const data = {
//                member_id: item.member_id,
//                content: item.content,
//                date: item.date,
//                start_time: item.start_time,
//                end_time: item.end_time,
//                is_done: item.is_done,
//            };
//    
//            http.fetchPut(url, data)
//                .then( response => {
//                    u.clog('success');
//
//                    commit('notifySuccess', {
//                        content: 'success update task',
//                        isImportant: false
//                    }, { root: true });
//        
//                    commit('reset');
//                })
//
//                .catch( error => {
//                    u.clog('failed');
//
//                    commit('toggleTaskDone', { item });
//                    commit('notifyDanger', {
//                        content: 'failed update member',
//                        isActive: true
//                    }, { root: true});
//
//                    commit('reset');
//                });
//
//        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        prepare( state, { editingItem } ) {
            state.editingItem = editingItem;
            state.input.content = editingItem.content;
            state.input.startTime = editingItem.startTime;
            state.input.endTime = editingItem.endTime;
            state.isActive = true;
        },

        start( state ) {
            state.isLoading = true;
        },

        toggleTaskDone( state ) {
            state.editingItem.is_done = !state.editingItem.is_done;
        },

        updateContent( state, { value } ) {
            state.editingItem.content = value;
            state.input.content = value;
        },

        updateTimeRange( state, { startTime, endTime } ) {
            state.editingItem.start_time = startTime;
            state.editingItem.end_time = endTime;
        },

        update( state ) {
// A patern
//            const keys = Object.keys(params);
//            keys.forEach(function(key) {
//                item[key] = params[key];
//            });

// B patern
//        const cellItems = state.calendar.data.calendars[dayIndex].items[memberId];
//        if(cellItems instanceof Array && cellItems[itemIndex]) {
//            const keys = Object.keys(params);
//            keys.forEach(function(key) {
//                cellItems[itemIndex][key] = params[key];
//            });
//        }
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