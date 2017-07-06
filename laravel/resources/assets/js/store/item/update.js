export default {
    namespaced: true,

    state: {
        isActive: false,
        isLoading: false,
        editingItem: '',
        input: {
            name: '',
            startTime: '',
            endTime: ''
        }
    },

    actions: {
        prepare( { commit }, { editingItem } ) {
            u.clog('prepare()');
            commit('prepare', { editingItem } );
        },

        toggleTaskDone( { dispatch, commit }, { item } ) {
            dispatch('update');
            commit('toggleTaskDone', { item });
        },

        update( { commit } ) {
            u.clog('update()');
            commit('update');

            commit('notifySuccess', {
                content: 'success update task',
                isImportant: false
            }, { root: true });

            commit('reset');
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
        prepare( state, { editingItem } ) {
            state.editingItem = editingItem;
            state.input.name = editingItem.name;
            state.input.startTime = editingItem.startTime;
            state.input.endTime = editingItem.endTime;
            state.isActive = true;
        },

        toggleTaskDone( state, { item } ) {
            item.is_done = !item.is_done;
        },

        start( state ) {
            state.isLoading = true;
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
            state.input.name = '',
            state.input.startTime = '',
            state.input.endTime = ''
        }
    }
}
