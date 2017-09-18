export default {
    namespaced: true,

    state: {
        isEventItemShow: true,
        isTaskItemShow: true,
        isEndTimeShow: true,

        query: {
            search: '',
            internal: ''
        },

        toolPalette: {
            isActive: false
        }
    },

    actions: {
        toggleTableToolPalette( { commit }, { value } ) {
            commit('toggleTableToolPalette', { value });
        },
    
        toggleShowHideColumn({ commit, rootState }, { id, value }) {
            const member = rootState.calendar.data.members[id];
            commit('toggleShowHideColumn', { member, value });
        },

        toggleShowHideEventItem( { commit }, { value } ) {
            commit('toggleShowHideEventItem', { value });
        },
    
        toggleShowHideTaskItem( { commit }, { value } ) {
            commit('toggleShowHideTaskItem', { value });
        },
    
        toggleShowHideEndTime( { commit }, { value } ) {
            commit('toggleShowHideEndTime', { value });
        },
    
        setSearchQuery( { commit }, { value } ) {
            commit('setSearchQuery', { value: value.toLowerCase() });
        },
    
        setInternalQuery( { commit }, { value } ) {
            commit('setInternalQuery', { value });
        }
    },

    mutations: {
        toggleShowHideColumn(state, { member, value }) {
            member.isShow = value;
        },

        toggleTableToolPalette( state, { value } ) {
            state.toolPalette.isActive = value;
        },
    
        toggleShowHideEventItem( state, { value } ) {
            state.isEventItemShow = value;
        },
    
        toggleShowHideTaskItem( state, { value } ) {
            state.isTaskItemShow = value;
        },
    
        toggleShowHideEndTime( state, { value } ) {
            state.isEndTimeShow = value;
        },
    
        setSearchQuery( state, { value } ) {
            state.query.search = value;
        },
    
        setInternalQuery( state, { value } ) {
            state.query.internal = value;
        }
    }
}
