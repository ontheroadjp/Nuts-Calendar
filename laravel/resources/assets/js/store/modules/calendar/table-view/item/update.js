export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        cellItems: '',
        editingItem: '',
        clickX: 0,
        clickY: 0,
        input: {
            content: '',
            startTime: '',
            endTime: '',
            allDay: '',
            memo: ''
        }
    },

    actions: {
        prepare( { commit }, { event, cellItems, editingItem } ) {
            u.clog('prepare()');
            commit('prepare', { event, cellItems, editingItem } );
        },

        prepareModal( { commit }, { event } ) {
            u.clog('prepareModal()');
            commit('prepareModal', { event } );
        },

        toggleTaskDone( { dispatch, commit } ) {
            commit('toggleTaskDone');
            dispatch('update');
        },

        setInputValue( { commit }, { key, value } ) {
            commit('setInputValue', { key, value } );
        },

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
                is_all_day: state.input.allDay,
                memo:       state.input.memo,
            };
    
            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    commit('update', {
                        content: response.data.content,
                        startTime: response.data.start_time,
                        endTime: response.data.end_time,
                        allDay: response.data.is_all_day,
                        isDone: response.data.is_done,
                        memo: response.data.memo
                    });

                    commit('calendar/tableView/sortCellItems', state.cellItems, {
                        root: true
                    });

                    commit('calendar/tableView/checkTime', state.cellItems, {
                        root: true
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
        prepare( state, { cellItems, editingItem } ) {
            state.cellItems = cellItems;
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

        isLoading( state, value ) {
            state.isLoading = value;
        },

//        start( state ) {
//            state.isLoading = true;
//        },

        toggleTaskDone( state ) {
            state.editingItem.is_done = !state.editingItem.is_done;
        },

        setInputValue( state, { key, value } ) {
            state.input[key] = value;
        },

        update( state, { content, startTime, endTime, allDay, isDone, memo } ) {
            state.editingItem.content = content;
            state.editingItem.start_time = startTime;
            state.editingItem.end_time = endTime;
            state.editingItem.is_all_day = allDay;
            state.editingItem.is_done = isDone;
            state.editingItem.memo = memo;
        },

//        stop( state ) {
//            state.isLoading = false;
//        },

        reset( state ) {
            state.isActive = false,
            state.cellItems = '',
            state.editingItem = '',
            state.isLoading = false,
            state.input.content = '',
            state.input.startTime = '',
            state.input.endTime = ''
        }
    }
}
