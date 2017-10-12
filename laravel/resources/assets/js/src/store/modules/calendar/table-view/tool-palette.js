import {
    TOGGLE_SHOW_HIDE_COLUMN,
    TOGGLE_TABLE_TOOL_PALETTE,
    TOGGLE_SHOW_HIDE_EVENT_ITEM,
    TOGGLE_SHOW_HIDE_TASK_ITEM,
    TOGGLE_SHOW_HIDE_END_TIME,
    SET_SEARCH_QUERY,
    SET_INTERNAL_QUERY
} from '../../../mutation-types.js';

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
            commit(TOGGLE_TABLE_TOOL_PALETTE, { value });
        },

        toggleShowHideColumn({ commit, rootState }, { id, value }) {
            const member = rootState.calendar.data.members[id];
            commit(TOGGLE_SHOW_HIDE_COLUMN, { member, value });
        },

        toggleShowHideEventItem( { commit }, { value } ) {
            commit(TOGGLE_SHOW_HIDE_EVENT_ITEM, { value });
        },

        toggleShowHideTaskItem( { commit }, { value } ) {
            commit(TOGGLE_SHOW_HIDE_TASK_ITEM, { value });
        },

        toggleShowHideEndTime( { commit }, { value } ) {
            commit(TOGGLE_SHOW_HIDE_END_TIME, { value });
        },

        setSearchQuery( { commit }, { value } ) {
            commit(SET_SEARCH_QUERY, { value: value.toLowerCase() });
        },

        setInternalQuery( { commit }, { value } ) {
            commit(SET_INTERNAL_QUERY, { value });
        }
    },

    mutations: {
        [TOGGLE_SHOW_HIDE_COLUMN](state, { member, value }) {
            member.isShow = value;
        },

        [TOGGLE_TABLE_TOOL_PALETTE]( state, { value } ) {
            state.toolPalette.isActive = value;
        },

        [TOGGLE_SHOW_HIDE_EVENT_ITEM]( state, { value } ) {
            state.isEventItemShow = value;
        },

        [TOGGLE_SHOW_HIDE_TASK_ITEM]( state, { value } ) {
            state.isTaskItemShow = value;
        },

        [TOGGLE_SHOW_HIDE_END_TIME]( state, { value } ) {
            state.isEndTimeShow = value;
        },

        [SET_SEARCH_QUERY]( state, { value } ) {
            state.query.search = value;
        },

        [SET_INTERNAL_QUERY]( state, { value } ) {
            state.query.internal = value;
        }
    }
};
