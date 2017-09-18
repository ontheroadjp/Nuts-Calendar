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

                    commit('update', data);

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
        
                    commit('isLoading', false);
                })

                .catch( error => {
                    u.clog('failed');

                    commit('toggleTaskDone');
                    commit('notifyDanger', {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

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
            state.input.allDay = editingItem.is_all_day;
            state.input.memo = editingItem.memo;
        },

        prepareModal( state, { event } ) {
            state.clickX = event.pageX;
            state.clickY = event.pageY;
            state.isActive = true;
        },

        isLoading( state, value ) {
            state.isLoading = value;
        },

        toggleTaskDone( state ) {
            state.editingItem.is_done = !state.editingItem.is_done;
        },

        setInputValue( state, { key, value } ) {
            state.input[key] = value;
        },

//        update( state, { content, startTime, endTime, allDay, isDone, memo } ) {
//            state.editingItem.content = content;
//            state.editingItem.start_time = startTime;
//            state.editingItem.end_time = endTime;
//            state.editingItem.is_all_day = allDay;
//            state.editingItem.is_done = isDone;
//            state.editingItem.memo = memo;
//        },

        update( state, data ) {
            Object.keys(data).forEach((key) => {
                state.editingItem[key] = data[key];
            });
//            state.editingItem.content = content;
//            state.editingItem.start_time = startTime;
//            state.editingItem.end_time = endTime;
//            state.editingItem.is_all_day = allDay;
//            state.editingItem.is_done = isDone;
//            state.editingItem.memo = memo;
        },

        reset( state ) {
            state.isActive = false,
            state.cellItems = '',
            state.editingItem = '',
            state.isLoading = false,
            Object.keys(state.input).forEach((key) => {
                state.input[key] = '';
            });
        }
    }
}
