import {
    PREPARE,
    PREPARE_MODAL,
    TOGGLE_TASK_DONE,
    SET_INPUT_VALUE,
    UPDATE,
    IS_LOADING,
    NOTIFY_SUCCESS,
    NOTIFY_DANGERR,
    RESET
} from '../../../../mutation-types.js';

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
            commit(PREPARE, { event, cellItems, editingItem } );
        },

        prepareModal( { commit }, { event } ) {
            u.clog('prepareModal()');
            commit(PREPARE_MODAL, { event } );
        },

        toggleTaskDone( { dispatch, commit } ) {
            commit(TOGGLE_TASK_DONE);
            dispatch('update');
        },

        setInputValue( { commit }, { key, value } ) {
            commit(SET_INPUT_VALUE, { key, value } );
        },

        update( { state, dispatch, commit } ) {
            commit(IS_LOADING, true);
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
//                is_done:    state.input.is_done,
                memo:       state.input.memo
            };

            http.fetchPut(url, data)
                .then( response => {
                    u.clog('success');

                    commit(UPDATE, data);

                    dispatch('calendar/tableView/updateCellItems',
                        state.cellItems, { root: true }
                    );

//                    commit(NOTIFY_SUCCESS, {
//                        content: 'success update task',
//                        isImportant: false
//                    }, { root: true });

                    commit(IS_LOADING, false);
                })

                .catch( error => {
                    u.clog('failed');

                    commit(TOGGLE_TASK_DONE);
                    commit(NOTIFY_DANGER, {
                        content: 'failed update member',
                        isActive: true
                    }, { root: true});

                    commit(IS_LOADING, false);
                });
        },

        reset( { commit } ) {
            commit(RESET);
        }
    },

    mutations: {
        [PREPARE]( state, { cellItems, editingItem } ) {
            state.cellItems = cellItems;
            state.editingItem = editingItem;
            state.input.content = editingItem.content;
            state.input.startTime = editingItem.start_time;
            state.input.endTime = editingItem.end_time;
            state.input.allDay = editingItem.is_all_day;
            state.input.memo = editingItem.memo;
        },

        [PREPARE_MODAL]( state, { event } ) {
            state.clickX = event.pageX;
            state.clickY = event.pageY;
            state.isActive = true;
        },

        [IS_LOADING]( state, value ) {
            state.isLoading = value;
        },

        [TOGGLE_TASK_DONE]( state ) {
            state.editingItem.is_done = !state.editingItem.is_done;
        },

        [SET_INPUT_VALUE]( state, { key, value } ) {
            state.input[key] = value;
        },

        [UPDATE]( state, data ) {
            Object.keys(data).forEach((key) => {
                state.editingItem[key] = data[key];
            });
        },

        [RESET]( state ) {
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
